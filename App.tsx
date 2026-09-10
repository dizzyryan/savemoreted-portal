import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Answers, Outcome, Screen } from './src/demo';
import { colors, Icon, IconName } from './src/ui';
import { Home, Welcome, LearnTED } from './src/screens/Home';
import { Questionnaire } from './src/screens/Questionnaire';
import { Capture } from './src/screens/Capture';
import { Results } from './src/screens/Results';
import { Referral } from './src/screens/Referral';
import { Report } from './src/screens/Report';
import { Reports } from './src/screens/Reports';
import { Chat } from './src/screens/Chat';
import { BottomTabs, Sidebar, Brand, TabId } from './src/Navigation';
import { initialChat } from './src/chat';
import { createDemoReport, DemoReport, reportDate, sampleReports } from './src/reports';

export default function App() {
  return (
    <SafeAreaProvider>
      <DemoApp />
    </SafeAreaProvider>
  );
}
function DemoApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [answers, setAnswers] = useState<Answers>({});
  const [outcome, setOutcome] = useState<Outcome>('yellow');
  const [completed, setCompleted] = useState(false);
  const [captureStep, setCaptureStep] = useState(0);
  const [retry, setRetry] = useState(false);
  const [reports, setReports] = useState<DemoReport[]>(sampleReports);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [selected, setSelected] = useState<DemoReport | null>(null);
  const [chat, setChat] = useState(initialChat);
  const scroll = useRef<ScrollView>(null);
  const desktop = useWindowDimensions().width >= 900;

  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
  }, [screen]);
  useEffect(() => {
    if (screen === 'questionnaire' && Object.keys(answers).length) {
      const timer = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 80);
      return () => clearTimeout(timer);
    }
  }, [answers, screen]);
  function start() {
    setAnswers({});
    setCompleted(false);
    setCaptureStep(0);
    setRetry(false);
    setScreen('welcome');
  }
  function reset() {
    start();
    setReports(sampleReports());
    setSelected(null);
    setChat(initialChat());
    setOutcome('yellow');
    setScreen('home');
    scroll.current?.scrollTo({ y: 0, animated: false });
  }
  function finish() {
    if (Object.keys(answers).length !== 4) return;
    const report = createDemoReport(answers, outcome);
    setReports((items) => [report, ...items]);
    setSelected(report);
    setCurrentId(report.id);
    setCompleted(true);
    setScreen('result');
  }
  function chooseOutcome(value: Outcome) {
    setOutcome(value);
    if (selected && !selected.example) {
      const updated = { ...selected, outcome: value };
      setSelected(updated);
      setReports((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    }
  }
  function repeat() {
    setCompleted(false);
    setCaptureStep(0);
    setRetry(false);
    setScreen(Object.keys(answers).length === 4 ? 'capture' : 'welcome');
  }
  function resume() {
    if (completed) setSelected(reports.find((item) => item.id === currentId) ?? null);
    setScreen(
      completed
        ? 'result'
        : Object.keys(answers).length === 4
          ? 'capture'
          : Object.keys(answers).length
            ? 'questionnaire'
            : 'welcome',
    );
  }
  const active =
    screen === 'home' || screen === 'learn'
      ? 'home'
      : screen === 'chat'
        ? 'chat'
        : screen === 'reports' || screen === 'report' || screen === 'referral'
          ? 'reports'
          : 'screening';
  const navigation: { id: string; icon: IconName; title: string; action: () => void }[] = [
    { id: 'home', icon: 'home', title: 'Home', action: () => setScreen('home') },
    { id: 'screening', icon: 'eye', title: 'Eye check', action: resume },
    { id: 'chat', icon: 'chat', title: 'Chat', action: () => setScreen('chat') },
    { id: 'reports', icon: 'report', title: 'Reports', action: () => setScreen('reports') },
  ];
  function selectTab(id: TabId) {
    navigation.find((item) => item.id === id)?.action();
  }
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.root}>
      <StatusBar style="dark" />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {desktop && <Sidebar active={active} select={selectTab} learn={() => setScreen('learn')} />}
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={[styles.topbar, { paddingHorizontal: 20, height: 64 }]}>
            {desktop ? (
              <Text style={{ color: colors.ink }}>
                {navigation.find((item) => item.id === active)?.title}
              </Text>
            ) : (
              <Brand />
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={styles.demoPill}>
                <Text style={{ color: colors.teal, fontSize: 10, fontWeight: '600' }}>DEMO</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Reset demo session"
                onPress={reset}
                style={{ padding: 12 }}
              >
                <Icon name="reset" size={18} />
              </Pressable>
            </View>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            {screen === 'chat' ? (
              <Chat session={chat} change={setChat} />
            ) : (
              <ScrollView
                ref={scroll}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  padding: desktop ? 32 : 20,
                  paddingBottom: 24,
                  flexGrow: 1,
                }}
              >
                <View style={{ maxWidth: 1100, width: '100%', alignSelf: 'center' }}>
                  {screen === 'home' && <Home start={start} learn={() => setScreen('learn')} />}
                  {screen === 'learn' && <LearnTED start={start} />}
                  {screen === 'welcome' && <Welcome begin={() => setScreen('questionnaire')} />}
                  {screen === 'questionnaire' && (
                    <Questionnaire
                      answers={answers}
                      answer={(id, value) => setAnswers((a) => ({ ...a, [id]: value }))}
                      next={() => {
                        if (Object.keys(answers).length === 4) setScreen('capture');
                      }}
                    />
                  )}
                  {screen === 'capture' && (
                    <Capture
                      step={captureStep}
                      setStep={setCaptureStep}
                      retry={retry}
                      setRetry={setRetry}
                      next={finish}
                    />
                  )}
                  {screen === 'result' && completed && (
                    <Results
                      outcome={outcome}
                      select={chooseOutcome}
                      referral={() => setScreen('referral')}
                      report={() => setScreen('report')}
                      repeat={repeat}
                    />
                  )}
                  {screen === 'reports' && (
                    <Reports
                      reports={reports}
                      open={(report) => {
                        setSelected(report);
                        setCurrentId(report.id);
                        setScreen('report');
                      }}
                    />
                  )}
                  {screen === 'report' && selected && (
                    <Report
                      key={selected.id}
                      outcome={selected.outcome}
                      answers={selected.answers}
                      date={reportDate(selected.createdAt)}
                      example={selected.example}
                      referral={() => setScreen('referral')}
                    />
                  )}
                  {screen === 'referral' && selected && (
                    <Referral
                      key={selected.id}
                      outcome={selected.outcome}
                      report={() => setScreen('report')}
                      repeat={repeat}
                    />
                  )}
                </View>
              </ScrollView>
            )}
          </KeyboardAvoidingView>
          {!desktop && <BottomTabs active={active} select={selectTab} />}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  sidebar: {
    width: 228,
    backgroundColor: '#FCFDF9',
    borderRightWidth: 1,
    borderColor: colors.line,
    padding: 23,
    paddingTop: 30,
    paddingBottom: 27,
  },
  sidebarNote: { backgroundColor: '#F0F4E9', borderRadius: 15, padding: 18, gap: 13 },
  topbar: {
    height: 76,
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCFDF9',
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EEF3E8',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  bottomNav: {
    backgroundColor: '#FCFDF9',
    borderTopWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    paddingBottom: 3,
  },
});

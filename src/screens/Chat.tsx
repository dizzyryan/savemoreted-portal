import { useRef, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ChatSession, initialChat, replyToDemoMessage } from '../chat';
import { Badge, Body, Button, colors, Icon, Label, Notice, s } from '../ui';

export function Chat({
  session,
  change,
}: {
  session: ChatSession;
  change: (value: ChatSession) => void;
}) {
  const [draft, setDraft] = useState('');
  const [examples, setExamples] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const scroll = useRef<ScrollView>(null);
  const paused = session.support === 'crisis';
  function send(value: string) {
    const text = value.trim();
    if (!text || paused) return;
    const reply = replyToDemoMessage(text, session);
    const id = session.messages.length;
    change({
      ...reply,
      messages: [
        ...session.messages,
        { id, role: 'user', text },
        { id: id + 1, role: 'assistant', text: reply.text },
      ],
    });
    setDraft('');
  }
  return (
    <View style={styles.page}>
      <View style={styles.heading}>
        <View style={s.row}>
          <View style={{ gap: 5 }}>
            <Label>YOUR EYE COMPANION</Label>
            <Text accessibilityRole="header" style={styles.title}>
              A space to talk.
            </Text>
          </View>
          <View style={styles.avatar}>
            <Icon name="chat" size={25} />
          </View>
        </View>
        <Badge>Demo replies · not a live clinical service</Badge>
      </View>
      <ScrollView
        ref={scroll}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={{ padding: 20, gap: 18 }}
      >
        {session.messages.map((message) => (
          <View
            key={message.id}
            style={[styles.bubble, message.role === 'user' ? styles.user : styles.assistant]}
          >
            <Text
              style={{
                color: message.role === 'user' ? '#fff' : colors.ink,
                fontSize: 14,
                lineHeight: 23,
              }}
            >
              {message.text}
            </Text>
          </View>
        ))}
        {session.support && (
          <View style={styles.support}>
            <Label>{paused ? 'IMMEDIATE SUPPORT' : 'YOU DON’T HAVE TO HANDLE THIS ALONE'}</Label>
            <Body>
              {session.support === 'mild'
                ? 'Consider sharing what you’re experiencing with someone you trust or your primary-care professional.'
                : 'Hong Kong: 18111 offers mental-health support. For immediate danger, call 999 or go to an Accident and Emergency Department. Outside Hong Kong, use your local services.'}
            </Body>
            {session.support !== 'mild' && (
              <Button
                secondary
                icon="arrow"
                onPress={() => {
                  setLinkError(false);
                  void Linking.openURL(
                    'https://www.shallwetalk.hk/en/get-help/emergency-helplines/',
                  ).catch(() => setLinkError(true));
                }}
              >
                View official support resources
              </Button>
            )}
            {linkError && (
              <Text style={s.small}>
                Could not open the resource page. In Hong Kong, contact 18111 for support or 999 for
                immediate danger.
              </Text>
            )}
            <Text style={s.small}>
              Three-tier safety-flow illustration. The demo uses basic phrase matching, can miss
              distress, and does not assess mental health. Wording and escalation rules need
              professional review.
            </Text>
            {paused && (
              <Button
                secondary
                icon="reset"
                onPress={() => {
                  change(initialChat());
                  setDraft('');
                }}
              >
                Reset demo conversation
              </Button>
            )}
          </View>
        )}
        {!paused && session.messages.length === 1 && (
          <View style={{ gap: 9 }}>
            <Text style={s.small}>Not sure where to start? Try a sample:</Text>
            {[
              'My eyes hurt when I look left',
              'I am seeing double',
              'Reading has become difficult',
            ].map((value) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                onPress={() => send(value)}
                style={styles.suggestion}
              >
                <Text style={{ fontSize: 12, color: colors.teal, flex: 1 }}>{value}</Text>
                <Icon name="plus" size={16} />
              </Pressable>
            ))}
          </View>
        )}
        {!paused && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setExamples(!examples)}
            style={{ paddingVertical: 8 }}
          >
            <Text style={{ color: colors.muted, fontSize: 11 }}>
              {' '}
              {examples ? 'Hide' : 'Show'} support-flow demo examples
            </Text>
          </Pressable>
        )}
        {examples && !paused && (
          <View style={{ gap: 8 }}>
            {[
              'I feel worried about my eyes',
              'I feel overwhelmed and cannot cope',
              'I want to hurt myself',
            ].map((value) => (
              <Pressable
                key={value}
                accessibilityRole="button"
                onPress={() => send(value)}
                style={styles.suggestion}
              >
                <Text style={{ color: colors.teal, fontSize: 12, flex: 1 }}>{value}</Text>
                <Icon name="arrow" size={16} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.composerArea}>
        {paused ? (
          <Notice>
            Symptom chat paused. Support information is shown above. This is not a monitored
            service.
          </Notice>
        ) : (
          <>
            <View style={styles.composer}>
              <TextInput
                accessibilityLabel="Message your eye companion"
                placeholder="Tell me how your eyes feel…"
                placeholderTextColor="#87988D"
                value={draft}
                onChangeText={setDraft}
                multiline
                maxLength={1000}
                style={styles.input}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Send message"
                accessibilityState={{ disabled: !draft.trim() }}
                disabled={!draft.trim()}
                onPress={() => send(draft)}
                style={[styles.send, !draft.trim() && { opacity: 0.4 }]}
              >
                <Icon name="arrow" color="#fff" size={21} />
              </Pressable>
            </View>
            <Text style={styles.caption}>
              Use fictional details · Session only · No messages are uploaded
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, width: '100%', maxWidth: 780, alignSelf: 'center' },
  heading: { padding: 20, gap: 14, borderBottomWidth: 1, borderColor: colors.line },
  title: { fontSize: 26, fontWeight: '600', letterSpacing: -0.7, color: colors.ink },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: colors.mint,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: { padding: 16, borderRadius: 18, maxWidth: '90%' },
  user: { backgroundColor: colors.teal, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  assistant: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
  },
  support: {
    padding: 18,
    gap: 14,
    borderRadius: 18,
    backgroundColor: '#FFF6E6',
    borderWidth: 1,
    borderColor: '#EADDCA',
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fff',
  },
  composerArea: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.cream,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    borderRadius: 22,
    padding: 8,
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5E2D8',
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 21,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.teal,
  },
  caption: { fontSize: 10, color: colors.muted, textAlign: 'center', marginTop: 8 },
});

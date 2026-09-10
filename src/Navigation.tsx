import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, Icon, IconName, s } from './ui';

export type TabId = 'home' | 'screening' | 'chat' | 'reports';
const tabs: { id: TabId; icon: IconName; title: string }[] = [
  { id: 'home', icon: 'home', title: 'Home' },
  { id: 'screening', icon: 'eye', title: 'Eye check' },
  { id: 'chat', icon: 'chat', title: 'Chat' },
  { id: 'reports', icon: 'report', title: 'Reports' },
];

export function BottomTabs({ active, select }: { active: TabId; select: (tab: TabId) => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        backgroundColor: colors.cream,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: Math.max(insets.bottom, 12),
      }}
    >
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const selected = active === tab.id;
          return (
            <Pressable
              key={tab.id}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              accessibilityLabel={tab.title}
              onPress={() => select(tab.id)}
              style={({ pressed }) => [styles.tab, { opacity: pressed ? 0.65 : 1 }]}
            >
              <View style={[styles.icon, selected && { backgroundColor: colors.mint }]}>
                <Icon name={tab.icon} size={22} color={selected ? colors.teal : '#8A998F'} />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: selected ? '700' : '500',
                  color: selected ? colors.dark : colors.muted,
                }}
              >
                {tab.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
export function Sidebar({
  active,
  select,
  learn,
}: {
  active: TabId;
  select: (tab: TabId) => void;
  learn: () => void;
}) {
  return (
    <View style={styles.sidebar}>
      <Brand />
      <Text style={[s.label, { color: colors.muted, marginTop: 44, marginBottom: 16 }]}>
        YOUR SPACE
      </Text>
      <View style={{ gap: 8 }}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active === tab.id }}
            onPress={() => select(tab.id)}
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
              padding: 15,
              borderRadius: 13,
              backgroundColor: active === tab.id ? colors.mint : 'transparent',
            }}
          >
            <Icon name={tab.icon} color={active === tab.id ? colors.teal : colors.muted} />
            <Text
              style={{
                color: colors.ink,
                fontSize: 14,
                fontWeight: active === tab.id ? '600' : '400',
              }}
            >
              {tab.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flex: 1 }} />
      <Pressable
        accessibilityRole="button"
        onPress={learn}
        style={{ padding: 18, borderRadius: 18, backgroundColor: colors.mint, gap: 10 }}
      >
        <Icon name="heart" />
        <Text style={{ color: colors.ink, fontSize: 15, fontWeight: '600' }}>Get to know TED</Text>
        <Text style={s.small}>A little understanding is a good place to start.</Text>
      </Pressable>
    </View>
  );
}
export function Brand() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 11,
          backgroundColor: colors.teal,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="eye" size={23} color="#E9F0D2" />
      </View>
      <Text style={{ color: colors.ink, fontSize: 16, fontWeight: '700', letterSpacing: -0.5 }}>
        SaveMore<Text style={{ color: colors.teal }}>TED</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E1E8DF',
    boxShadow: '0px 3px 14px rgba(32, 63, 59, 0.06)',
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 5, gap: 3, minHeight: 57 },
  icon: { width: 48, height: 30, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  sidebar: {
    width: 230,
    borderRightWidth: 1,
    borderColor: colors.line,
    backgroundColor: '#FCFDF9',
    padding: 22,
    paddingTop: 30,
    paddingBottom: 30,
  },
});

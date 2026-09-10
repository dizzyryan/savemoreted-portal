import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export const colors = {
  ink: '#203F3B',
  muted: '#71827C',
  teal: '#267D70',
  dark: '#155D52',
  mint: '#EAF3ED',
  cream: '#F7F8F4',
  line: '#E3E9E2',
  white: '#FFFFFF',
};
export type IconName =
  | 'home'
  | 'eye'
  | 'chat'
  | 'report'
  | 'arrow'
  | 'check'
  | 'shield'
  | 'clock'
  | 'chevron'
  | 'close'
  | 'back'
  | 'info'
  | 'heart'
  | 'download'
  | 'calendar'
  | 'plus'
  | 'reset';
export function Icon({
  name,
  size = 22,
  color = colors.teal,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const paths: Partial<Record<IconName, string>> = {
    home: 'M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9',
    chat: 'M21 11a8 8 0 0 1-8 8H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4M7 8h10M7 12h6',
    report: 'M14 2H5v20h14V7l-5-5v5h5M8 11h8M8 15h8M8 18h5',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    check: 'M5 12l4 4L19 6',
    shield: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4M8 12l3 3 5-6',
    clock: 'M12 7v5l3 2',
    chevron: 'm9 5 7 7-7 7',
    close: 'm6 6 12 12M6 18 18 6',
    back: 'M20 12H4m6-6-6 6 6 6',
    info: 'M12 11v6M12 7h.01',
    heart: 'M20 4c-3-3-7-1-8 2-1-3-5-5-8-2-5 5 3 12 8 16 5-4 13-11 8-16Z',
    download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
    calendar: 'M4 5h16v16H4V5M8 2v6M16 2v6M4 10h16M8 14h2M14 14h2',
    plus: 'M12 4v16M4 12h16',
    reset: 'M4 10a8 8 0 1 1 1 8M4 3v7h7',
  };
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === 'eye' ? (
        <>
          <Path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
          <Circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <Path d={paths[name]} />
      )}
      {(name === 'clock' || name === 'info') && <Circle cx="12" cy="12" r="9" />}
    </Svg>
  );
}
export function Label({ children, color = colors.teal }: PropsWithChildren<{ color?: string }>) {
  return <Text style={[s.label, { color }]}>{children}</Text>;
}
function Title({ children }: PropsWithChildren) {
  return (
    <Text accessibilityRole="header" style={s.title}>
      {children}
    </Text>
  );
}
export function Body({ children, style }: PropsWithChildren<{ style?: StyleProp<TextStyle> }>) {
  return <Text style={[s.body, style]}>{children}</Text>;
}
export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[s.card, style]}>{children}</View>;
}
export function Button({
  children,
  onPress,
  secondary,
  icon = 'arrow',
  disabled,
  accessibilityLabel,
}: PropsWithChildren<{
  onPress: () => void;
  secondary?: boolean;
  icon?: IconName;
  disabled?: boolean;
  accessibilityLabel?: string;
}>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
        s.button,
        secondary && s.secondaryButton,
        { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
        hovered && !disabled && { transform: [{ translateY: -1 }] },
      ]}
    >
      <Text style={[s.buttonText, secondary && { color: colors.ink }]}>{children}</Text>
      <Icon name={icon} size={19} color={secondary ? colors.teal : '#fff'} />
    </Pressable>
  );
}
export function Badge({
  children,
  color = colors.teal,
  tint = colors.mint,
}: PropsWithChildren<{ color?: string; tint?: string }>) {
  return (
    <View style={[s.badge, { backgroundColor: tint }]}>
      <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: color }} />
      <Text style={{ color, fontSize: 11, fontWeight: '600' }}>{children}</Text>
    </View>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <View style={{ gap: 10, marginBottom: 28 }}>
      <Label>{eyebrow}</Label>
      <Title>{title}</Title>
      <Body>{description}</Body>
    </View>
  );
}
export function Notice({ children }: PropsWithChildren) {
  return (
    <View style={s.notice}>
      <Icon name="info" size={18} />
      <Text style={{ flex: 1, fontSize: 12, lineHeight: 19, color: colors.muted }}>{children}</Text>
    </View>
  );
}
export function StepHeading({ step, title }: { step: number; title: string }) {
  return (
    <View style={{ gap: 14, marginBottom: 26 }}>
      <View style={s.row}>
        <Label>YOUR EYE CHECK</Label>
        <Text style={s.small}>
          {step} OF 3 · {title.toUpperCase()}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 4,
              backgroundColor: n <= step ? colors.teal : colors.line,
            }}
          />
        ))}
      </View>
    </View>
  );
}
export const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  label: { fontSize: 10, letterSpacing: 1.8, fontWeight: '700' },
  title: { fontSize: 31, lineHeight: 39, fontWeight: '600', letterSpacing: -1, color: colors.ink },
  body: { fontSize: 14, lineHeight: 23, color: colors.muted },
  small: { fontSize: 11, color: colors.muted, lineHeight: 17 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.line,
  },
  button: {
    minHeight: 49,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.teal,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryButton: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  buttonText: { fontSize: 13, fontWeight: '600', color: '#fff', flexShrink: 1 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  notice: {
    padding: 16,
    backgroundColor: '#F0F4EE',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
});

import { Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useState } from 'react';
import { Badge, Body, Button, Card, colors, Icon, Label, Notice, PageHeading, s } from '../ui';
import { EyeArtwork } from '../illustrations';

export function Home({ start, learn }: { start: () => void; learn: () => void }) {
  const wide = useWindowDimensions().width > 1050;
  return (
    <View style={{ gap: 22 }}>
      <View style={{ gap: 6 }}>
        <Label>WELCOME TO SAVEMORETED</Label>
        <Text accessibilityRole="header" style={styles.greeting}>
          A little clarity for your eyes.
        </Text>
      </View>
      <Pressable accessibilityRole="button" onPress={learn} style={styles.intro}>
        <View style={styles.icon}>
          <Icon name="heart" />
        </View>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={styles.cardTitle}>First, what is TED?</Text>
          <Text style={s.small}>
            Understand Thyroid Eye Disease and what a screening can tell you.
          </Text>
        </View>
        <Icon name="arrow" size={19} />
      </Pressable>
      <View style={[styles.hero, { minHeight: wide ? 330 : 290 }]}>
        <View style={{ gap: 17, zIndex: 1, maxWidth: wide ? '55%' : '100%' }}>
          <Badge tint="#39786C" color="#E3ECCC">
            GUIDED EYE CHECK
          </Badge>
          <Text accessibilityRole="header" style={styles.heroTitle}>
            A clearer picture{wide ? '\n' : ' '}starts with you.
          </Text>
          <Text style={styles.heroBody}>
            Take a guided first step toward understanding your eye symptoms.
          </Text>
          <Pressable accessibilityRole="button" onPress={start} style={styles.start}>
            <Text style={{ color: colors.dark, fontSize: 14, fontWeight: '700' }}>
              Explore your eye check
            </Text>
            <Icon name="arrow" size={20} />
          </Pressable>
          <Text style={{ fontSize: 11, color: '#C9DFD0' }}>3 simple steps · At your own pace</Text>
        </View>
        {wide && (
          <View style={styles.art}>
            <EyeArtwork />
          </View>
        )}
      </View>
      <Text style={{ color: colors.muted, fontSize: 12, lineHeight: 19, textAlign: 'center' }}>
        An AI-assisted pre-screening concept. Demo results are simulated and cannot diagnose or rule
        out TED.
      </Text>
    </View>
  );
}

export function LearnTED({ start }: { start: () => void }) {
  const [error, setError] = useState(false);
  return (
    <View style={{ maxWidth: 730, width: '100%', alignSelf: 'center', gap: 20 }}>
      <PageHeading
        eyebrow="GET TO KNOW YOUR EYES"
        title="What is Thyroid Eye Disease?"
        description="TED is a condition in which the immune system affects tissues around the eyes, causing inflammation and changes in how the eyes look or feel."
      />
      <Card style={{ gap: 16 }}>
        <Icon name="eye" size={30} />
        <Text style={styles.cardTitle}>More than how your eyes look</Text>
        <Body>
          Symptoms can include dryness or irritation, puffiness, eye discomfort, bulging eyes, or
          double vision — seeing two images of one object. Symptoms alone cannot confirm TED.
        </Body>
        <Body>
          An eye-care professional can examine your eyes and interpret symptoms alongside your
          medical history.
        </Body>
      </Card>
      <Card style={{ gap: 14, backgroundColor: colors.mint }}>
        <Label>WHERE THIS APP FITS</Label>
        <Body>
          The proposed eye check brings symptoms and guided images together to help prepare for a
          professional assessment. It is a pre-screening tool, not a diagnosis.
        </Body>
        <Text style={s.small}>
          In this demo, the camera and results are simulated. You can explore the experience without
          taking photos.
        </Text>
      </Card>
      <Button
        secondary
        onPress={() => {
          void Linking.openURL(
            'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/graves-eye-disease',
          ).catch(() => setError(true));
        }}
      >
        Read more at the National Eye Institute
      </Button>
      {error && (
        <Text style={s.small}>Unable to open the information page. Please try again later.</Text>
      )}
      <Button onPress={start}>Explore the guided eye check</Button>
    </View>
  );
}

export function Welcome({ begin }: { begin: () => void }) {
  return (
    <View style={{ maxWidth: 730, width: '100%', alignSelf: 'center', gap: 20 }}>
      <PageHeading
        eyebrow="YOUR GUIDED EYE CHECK"
        title="Three steps. Your own pace."
        description="Here’s what to expect before you begin. You can switch tabs and come back to continue."
      />
      <Card style={{ gap: 26 }}>
        {[
          [
            '01',
            'Share your symptoms',
            'Answer four short questions about eye discomfort, double vision, and daily life.',
          ],
          [
            '02',
            'Follow the eye guide',
            'Try six illustrative gaze positions with simulated camera feedback.',
          ],
          [
            '03',
            'Review your next step',
            'See a sample result, a dated report, and an example care pathway.',
          ],
        ].map(([number, title, text]) => (
          <View key={number} style={{ flexDirection: 'row', gap: 16 }}>
            <View style={styles.number}>
              <Text style={{ color: colors.teal, fontWeight: '600' }}>{number}</Text>
            </View>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Body style={{ fontSize: 13 }}>{text}</Body>
            </View>
          </View>
        ))}
      </Card>
      <Notice>
        Use fictional details. This is a demo, not an assessment. No camera is active, and your
        answers and reports stay in this session until you reset or reload.
      </Notice>
      <Button onPress={begin}>Begin eye check</Button>
    </View>
  );
}
const styles = StyleSheet.create({
  greeting: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
    color: colors.ink,
    letterSpacing: -0.8,
  },
  intro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.line,
  },
  icon: {
    width: 43,
    height: 43,
    backgroundColor: colors.mint,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { color: colors.ink, fontSize: 16, fontWeight: '600' },
  hero: { padding: 26, borderRadius: 24, backgroundColor: '#216C5F', overflow: 'hidden' },
  heroTitle: {
    fontSize: 32,
    lineHeight: 39,
    letterSpacing: -1,
    color: '#F3F7EB',
    fontWeight: '500',
  },
  heroBody: { color: '#D0E1D5', fontSize: 14, lineHeight: 22, maxWidth: 320 },
  start: {
    backgroundColor: '#E4EDC8',
    borderRadius: 13,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    alignSelf: 'flex-start',
  },
  art: { position: 'absolute', right: 0, bottom: 0, width: '47%', height: 330 },
  number: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

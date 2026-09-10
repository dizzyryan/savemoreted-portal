import { useState } from 'react';
import { Platform, Share, Text, View } from 'react-native';
import { Answers, buildReport, Outcome, outcomes, questions } from '../demo';
import { Badge, Body, Button, Card, colors, Label, Notice, PageHeading, s } from '../ui';

export function Report({
  outcome,
  answers,
  date,
  example,
  referral,
}: {
  outcome: Outcome;
  answers: Answers;
  date: string;
  example: boolean;
  referral: () => void;
}) {
  const [message, setMessage] = useState('');
  const result = outcomes[outcome];
  const shownAnswers = answers;
  async function exportReport() {
    try {
      const text = buildReport(outcome, shownAnswers, date, example);
      if (Platform.OS === 'web') {
        const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SaveMoreTED-demo-report.txt';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setMessage(
          'Download requested. Check your browser’s downloads for the demo text report. It contains simulated data and the displayed responses.',
        );
      } else {
        const response = await Share.share({ title: 'SaveMoreTED demo report', message: text });
        setMessage(
          response.action === Share.dismissedAction
            ? 'Sharing cancelled.'
            : 'Report opened in your chosen sharing destination.',
        );
      }
    } catch {
      setMessage('The report could not be exported. Please try again.');
    }
  }
  return (
    <View style={{ maxWidth: 830, width: '100%', alignSelf: 'center', gap: 20 }}>
      <PageHeading
        eyebrow="THE BIGGER PICTURE"
        title="Your preliminary report."
        description="A clear, structured summary designed to support a future conversation with a clinician."
      />
      <Card style={{ gap: 22 }}>
        <View style={[s.row, { flexWrap: 'wrap' }]}>
          <View style={{ gap: 7 }}>
            <Label>SAVEMORETED</Label>
            <Text style={{ fontSize: 22, color: colors.ink, fontWeight: '600' }}>
              Eye-check summary
            </Text>
            <Text style={s.small}>
              {date} · {example ? 'Fictional example report' : 'Saved demo session'}
            </Text>
          </View>
          <Badge color={result.color} tint={result.tint}>
            {result.name} sample
          </Badge>
        </View>
        <Notice>
          DEMONSTRATION ONLY. No real medical measurements, AI analysis, or clinical assessment. Not
          for use in patient care.
        </Notice>
        <View style={{ gap: 9 }}>
          <Label>SAMPLE SCREENING SUMMARY</Label>
          <Text style={{ fontSize: 20, color: colors.ink }}>{result.title}</Text>
          <Body>{result.summary}</Body>
        </View>
        <View style={{ height: 1, backgroundColor: colors.line }} />
        <Label>01 / SYMPTOM CONVERSATION</Label>
        <Text style={s.small}>
          {example
            ? 'Fictional responses for this example.'
            : 'Responses you selected during the demo. Not interpreted by a model.'}
        </Text>
        {questions.map((q) => (
          <View key={q.id} style={{ gap: 5 }}>
            <Text style={{ fontSize: 13, color: colors.muted }}>{q.title}</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.ink }}>
              {shownAnswers[q.id] ?? 'Not answered'}
            </Text>
          </View>
        ))}
        <View style={{ height: 1, backgroundColor: colors.line }} />
        <Label>02 / CAPTURE & OCULAR FEATURES</Label>
        <Body style={{ fontSize: 12 }}>
          All values below are fictional illustrations. No camera calibration or measurement has
          taken place.
        </Body>
        <View
          style={{ borderWidth: 1, borderColor: colors.line, borderRadius: 12, overflow: 'hidden' }}
        >
          <View style={{ flexDirection: 'row', padding: 13, backgroundColor: colors.mint }}>
            <Text style={{ flex: 1.4, fontSize: 11, color: colors.teal, fontWeight: '600' }}>
              FEATURE
            </Text>
            <Text style={{ flex: 1, fontSize: 11, color: colors.teal, fontWeight: '600' }}>
              SAMPLE VALUE
            </Text>
          </View>
          {[
            [
              'Capture quality',
              outcome === 'inconclusive' ? 'Insufficient (sample)' : 'Acceptable (simulated)',
            ],
            [
              'MRD1 · upper lid distance',
              outcome === 'inconclusive' ? 'Unavailable' : 'R 4.0 / L 4.5 mm',
            ],
            [
              'Lid aperture · eye opening',
              outcome === 'inconclusive' ? 'Unavailable' : 'R 9.0 / L 9.5 mm',
            ],
            ['Redness / swelling', 'Not assessed'],
            ['Motility / lid lag', 'Not assessed'],
            ['Proptosis estimation', 'Research feature · not assessed'],
            ['AI-assisted CAS estimation', 'Not assessed'],
          ].map(([feature, value]) => (
            <View
              key={feature}
              style={{
                flexDirection: 'row',
                padding: 13,
                borderTopWidth: 1,
                borderColor: colors.line,
                gap: 10,
              }}
            >
              <Text style={{ flex: 1.4, color: colors.ink, fontSize: 12, lineHeight: 19 }}>
                {feature}
              </Text>
              <Text style={{ flex: 1, color: colors.muted, fontSize: 12, lineHeight: 19 }}>
                {value}
              </Text>
            </View>
          ))}
        </View>
        <Text style={s.small}>
          MRD1 is the distance from the central corneal light reflection to the upper eyelid edge. R
          / L indicates right / left eye. This demo does not measure either.
        </Text>
        <Label>03 / EXAMPLE NEXT STEP</Label>
        <Body>
          {result.next}. {result.detail}
        </Body>
        <Notice>
          A Green screening cannot rule out TED. Clinical interpretation, scoring, thresholds, and
          safety overrides require professional definition and validation.
        </Notice>
      </Card>
      <Button onPress={exportReport} icon="download">
        {Platform.OS === 'web' ? 'Download demo report (.txt)' : 'Share demo report'}
      </Button>
      {!!message && <Notice>{message}</Notice>}
      <Text style={[s.small, { textAlign: 'center' }]}>
        Export includes the displayed responses. Sharing is your choice.
      </Text>
      <Button secondary onPress={referral}>
        Explore the care pathway
      </Button>
    </View>
  );
}

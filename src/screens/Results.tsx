import { View, Text, Pressable } from 'react-native';
import { Outcome, outcomes } from '../demo';
import { Badge, Body, Button, Card, colors, Icon, Label, Notice, StepHeading, s } from '../ui';

function ScenarioPicker({
  outcome,
  select,
}: {
  outcome: Outcome;
  select: (value: Outcome) => void;
}) {
  return (
    <View style={{ gap: 10 }}>
      <Label>PRESENTER CONTROLS · SAMPLE OUTCOME</Label>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {(Object.keys(outcomes) as Outcome[]).map((key) => (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={`Show ${outcomes[key].name} sample`}
            accessibilityState={{ selected: key === outcome }}
            onPress={() => select(key)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              paddingVertical: 11,
              paddingHorizontal: 13,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: key === outcome ? outcomes[key].color : colors.line,
              backgroundColor: key === outcome ? outcomes[key].tint : colors.white,
            }}
          >
            <View
              style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: outcomes[key].color }}
            />
            <Text
              style={{
                fontSize: 12,
                color: outcomes[key].color,
                fontWeight: key === outcome ? '700' : '400',
              }}
            >
              {outcomes[key].name}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={s.small}>
        Changes the fictional example only. Your answers do not determine this result.
      </Text>
    </View>
  );
}

export function Results({
  outcome,
  select,
  referral,
  report,
  repeat,
}: {
  outcome: Outcome;
  select: (value: Outcome) => void;
  referral: () => void;
  report: () => void;
  repeat: () => void;
}) {
  const result = outcomes[outcome];
  return (
    <View style={{ maxWidth: 760, width: '100%', alignSelf: 'center', gap: 22 }}>
      <StepHeading step={3} title="Your sample summary" />
      <ScenarioPicker outcome={outcome} select={select} />
      <Card style={{ gap: 19, borderColor: result.color + '40' }}>
        <Badge color={result.color} tint={result.tint}>
          {result.name} · Simulated result
        </Badge>
        <Text
          accessibilityRole="header"
          style={{
            fontSize: 30,
            lineHeight: 38,
            fontWeight: '500',
            color: colors.ink,
            letterSpacing: -0.8,
          }}
        >
          {result.title}
        </Text>
        <Body>{result.summary}</Body>
        <View style={{ height: 1, backgroundColor: colors.line }} />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Icon name={outcome === 'inconclusive' ? 'info' : 'shield'} color={result.color} />
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ color: colors.ink, fontSize: 15, fontWeight: '600' }}>
              {result.next}
            </Text>
            <Body style={{ fontSize: 13 }}>{result.detail}</Body>
          </View>
        </View>
      </Card>
      <Card style={{ gap: 16 }}>
        <Label>WHAT’S IN YOUR SUMMARY</Label>
        {[
          ['Symptom conversation', '4 responses recorded in this demo'],
          [
            'Guided capture',
            outcome === 'inconclusive'
              ? 'Insufficient quality — sample scenario'
              : '6 illustrative positions completed',
          ],
          [
            'Ocular findings',
            outcome === 'inconclusive'
              ? 'Unavailable in this example'
              : 'Fictional measurement examples',
          ],
          ['Proptosis & CAS', 'Not assessed'],
        ].map(([label, value]) => (
          <View key={label} style={[s.row, { alignItems: 'flex-start' }]}>
            <Text style={{ fontSize: 13, color: colors.ink, flex: 1 }}>{label}</Text>
            <Text style={{ fontSize: 12, color: colors.muted, flex: 1, textAlign: 'right' }}>
              {value}
            </Text>
          </View>
        ))}
      </Card>
      <Button onPress={referral}>Explore the care pathway</Button>
      <Button secondary onPress={report} icon="report">
        View preliminary report
      </Button>
      {outcome === 'inconclusive' && (
        <Button secondary onPress={repeat} icon="reset">
          Repeat guided capture
        </Button>
      )}
      <Notice>
        This is a presentation example, not a medical result. No diagnosis, risk calculation,
        clinical safety override, or referral decision has been made.
      </Notice>
    </View>
  );
}

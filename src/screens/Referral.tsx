import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Outcome, outcomes } from '../demo';
import { Badge, Body, Button, Card, colors, Icon, Label, Notice, PageHeading } from '../ui';

export function Referral({
  outcome,
  report,
  repeat,
}: {
  outcome: Outcome;
  report: () => void;
  repeat: () => void;
}) {
  const [preparing, setPreparing] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const result = outcomes[outcome];
  return (
    <View style={{ maxWidth: 760, width: '100%', alignSelf: 'center', gap: 20 }}>
      <PageHeading
        eyebrow="YOUR NEXT STEP"
        title="A little guidance for what’s next."
        description="An example of how screening information could connect someone with professional care."
      />
      <Badge color={result.color} tint={result.tint}>
        {result.name} sample pathway
      </Badge>
      <Card style={{ gap: 16 }}>
        <Icon name="heart" size={29} />
        <Text style={{ fontSize: 24, lineHeight: 31, color: colors.ink }}>{result.next}</Text>
        <Body>{result.detail}</Body>
        <Notice>
          Illustrative pathway. Referral timing, destinations, and medical wording must be defined
          by the clinical team.
        </Notice>
      </Card>
      <Card style={{ gap: 23 }}>
        <Label>FROM SCREENING TO CONVERSATION</Label>
        {[
          [
            '01',
            'Review your summary',
            'Keep your symptoms and example findings together in one place.',
          ],
          [
            '02',
            outcome === 'inconclusive'
              ? 'Repeat or contact a professional'
              : 'Connect with a healthcare professional',
            outcome === 'red'
              ? 'The production app would display the clinician-approved urgent contact pathway here.'
              : 'The production app would display verified local services and contact options here.',
          ],
          [
            '03',
            'Bring the relevant information',
            'A clinician can review symptoms and perform the examinations needed for assessment.',
          ],
        ].map(([number, title, detail]) => (
          <View key={number} style={{ flexDirection: 'row', gap: 16 }}>
            <View
              style={{
                borderRadius: 12,
                width: 37,
                height: 37,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.mint,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.teal }}>{number}</Text>
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ color: colors.ink, fontSize: 14, fontWeight: '600' }}>{title}</Text>
              <Body style={{ fontSize: 12 }}>{detail}</Body>
            </View>
          </View>
        ))}
      </Card>
      {!preparing ? (
        <Button onPress={() => setPreparing(true)} icon="calendar">
          Preview consultation preparation
        </Button>
      ) : (
        <Card style={{ gap: 18 }}>
          <Badge>MOCK CONSULTATION · NOT A BOOKING</Badge>
          <Text style={{ fontSize: 21, color: colors.ink }}>Let’s get your notes ready</Text>
          <Body>
            There are no live clinic listings or appointment slots in this demo. Try the preparation
            checklist below.
          </Body>
          {[
            'Review the screening summary',
            'Note when symptoms started',
            'Prepare questions for the clinician',
          ].map((item) => (
            <Pressable
              key={item}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: checked.includes(item) }}
              onPress={() =>
                setChecked(
                  checked.includes(item) ? checked.filter((v) => v !== item) : [...checked, item],
                )
              }
              style={{ flexDirection: 'row', gap: 12, paddingVertical: 8, alignItems: 'center' }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: colors.teal,
                  backgroundColor: checked.includes(item) ? colors.mint : '#fff',
                }}
              >
                {checked.includes(item) && <Icon name="check" size={22} />}
              </View>
              <Text style={{ flex: 1, fontSize: 13, color: colors.ink }}>{item}</Text>
            </Pressable>
          ))}
          <Button onPress={() => setConfirmed(true)} icon="check" disabled={checked.length < 3}>
            Finish preparation preview
          </Button>
          {confirmed && (
            <Notice>
              Demo checklist completed. No appointment was booked, no referral was sent, and no
              clinic received your information.
            </Notice>
          )}
        </Card>
      )}
      {outcome === 'inconclusive' && (
        <Button secondary onPress={repeat} icon="reset">
          Try the capture again
        </Button>
      )}
      <Button secondary onPress={report} icon="report">
        View your demo report
      </Button>
    </View>
  );
}

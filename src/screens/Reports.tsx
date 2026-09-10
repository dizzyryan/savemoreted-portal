import { Pressable, Text, View } from 'react-native';
import { DemoReport, reportDate } from '../reports';
import { outcomes } from '../demo';
import { Badge, Body, colors, Icon, PageHeading, s } from '../ui';

export function Reports({
  reports,
  open,
}: {
  reports: DemoReport[];
  open: (report: DemoReport) => void;
}) {
  return (
    <View style={{ maxWidth: 830, width: '100%', alignSelf: 'center', gap: 18 }}>
      <PageHeading
        eyebrow="YOUR EYE-CHECK JOURNAL"
        title="Your reports."
        description="Each eye check has its own summary. Select a date to see the details."
      />
      {reports.map((report) => {
        const result = outcomes[report.outcome];
        return (
          <Pressable
            key={report.id}
            accessibilityRole="button"
            accessibilityLabel={`Open ${report.example ? 'example' : 'session'} report ${reportDate(report.createdAt)}`}
            onPress={() => open(report)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.mint : '#fff',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.line,
              padding: 20,
              gap: 17,
            })}
          >
            <View style={s.row}>
              <View style={{ backgroundColor: colors.mint, borderRadius: 13, padding: 11 }}>
                <Icon name="report" size={23} />
              </View>
              <Badge color={result.color} tint={result.tint}>
                {result.name} sample
              </Badge>
            </View>
            <View style={s.row}>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ fontSize: 17, color: colors.ink, fontWeight: '600' }}>
                  {reportDate(report.createdAt)}
                </Text>
                <Text style={s.small}>
                  {report.example ? 'Fictional example' : 'Completed in this demo session'} ·
                  Preliminary report
                </Text>
              </View>
              <Icon name="chevron" size={18} />
            </View>
          </Pressable>
        );
      })}
      <Body style={{ fontSize: 12, textAlign: 'center' }}>
        Demo history is kept in memory only. Reset or reload clears session reports and restores the
        fictional examples.
      </Body>
    </View>
  );
}

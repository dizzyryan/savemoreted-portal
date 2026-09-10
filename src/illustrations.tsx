import Svg, { Circle, Ellipse, Path, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export function EyeArtwork({
  capture = false,
  gaze = 'center',
}: {
  capture?: boolean;
  gaze?: string;
}) {
  const dx = gaze === 'left' ? -9 : gaze === 'right' ? 9 : 0;
  const dy = gaze === 'up' ? -5 : gaze === 'down' ? 5 : 0;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 380 340" fill="none">
      <Defs>
        <LinearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#CBE4BC" />
          <Stop offset="1" stopColor="#A8C9B1" />
        </LinearGradient>
      </Defs>
      <Circle
        cx="190"
        cy="166"
        r="139"
        fill={capture ? '#244F49' : '#FFFFFF'}
        fillOpacity={capture ? 1 : 0.07}
      />
      <Circle cx="190" cy="166" r="115" stroke="#BBD8CB" strokeOpacity=".23" />
      <Ellipse cx="190" cy="303" rx="98" ry="10" fill="#113E36" fillOpacity=".15" />
      <Path d="M100 287c7-50 42-66 63-72h54c26 9 57 28 64 72" fill="#78A998" />
      <Path d="M163 198v29c2 22 51 22 54 0v-29" fill="#ACCAAF" />
      <Ellipse cx="190" cy="141" rx="65" ry="89" fill="url(#orb)" />
      <Path
        d="M126 142c-10-61 13-102 63-102 48 0 75 38 67 102l-15-37c-38 8-63-9-72-19-9 20-26 25-39 25"
        fill="#214E45"
      />
      <Path
        d="M147 127q14-8 27-1M207 126q13-7 26 1"
        stroke="#416B57"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {gaze === 'closed' ? (
        <Path d="M145 146q15 11 31 0m30 0q15 11 31 0" stroke="#416B57" strokeWidth="3" />
      ) : (
        <>
          <Path d="M145 146q15-15 31 0-16 14-31 0M206 146q15-15 31 0-16 14-31 0" fill="#F3F6E8" />
          <Circle cx={161 + dx} cy={146 + dy} r="7" fill="#416B57" />
          <Circle cx={222 + dx} cy={146 + dy} r="7" fill="#416B57" />
          <Circle cx={161 + dx} cy={146 + dy} r="3" fill="#1D4037" />
          <Circle cx={222 + dx} cy={146 + dy} r="3" fill="#1D4037" />
        </>
      )}
      <Path
        d="m190 147-6 29q6 4 13 0M175 192q16 9 32 0"
        stroke="#7EAB8B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <G stroke="#E0EECE" strokeWidth="2" strokeLinecap="round">
        <Path d="M104 115V94h22M254 94h22v21M104 208v21h22M254 229h22v-21" />
      </G>
      <Path d="M133 146h113" stroke="#E8F5D9" strokeDasharray="3 6" strokeOpacity=".6" />
      {[145, 161, 176, 207, 222, 237].map((x, i) => (
        <Circle key={x} cx={x} cy={i % 3 === 1 ? 139 : 146} r="2.5" fill="#EEFAE2" />
      ))}
      {!capture && (
        <>
          <Rect x="248" y="180" width="106" height="38" rx="12" fill="#F4F8EE" />
          <Circle cx="266" cy="199" r="8" fill="#DFEDDB" />
          <Path d="m262 199 3 3 4-6" stroke="#327467" strokeWidth="1.5" />
          <Path d="M282 194h50M282 202h34" stroke="#95B6A3" strokeWidth="3" strokeLinecap="round" />
          <Rect x="35" y="92" width="63" height="35" rx="11" fill="#F4F8EE" />
          <Path d="M46 109s8-11 20-0c-12 11-20 0-20 0Z" stroke="#3E796A" />
          <Circle cx="56" cy="109" r="3" fill="#3E796A" />
          <Path d="M73 105h13M73 112h8" stroke="#A7C0AF" strokeWidth="2" />
        </>
      )}
    </Svg>
  );
}

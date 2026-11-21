import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.sch.smpn16serang.pancasilasmart',
  appName: 'Pancasila Smart Learning',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#0F2942',
  },
};

export default config;

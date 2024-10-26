import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {ViteFaviconsPlugin} from 'vite-plugin-favicon'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    ViteFaviconsPlugin({
      logo: './icons/shopping-bag.png',
      outputDir: 'public',
      inject: true,
      favicons: {
        favicon: true,
        apple: true,
        windows: true,
        manifest: true,
        maskable: true,
      },
    }),
  ],
})

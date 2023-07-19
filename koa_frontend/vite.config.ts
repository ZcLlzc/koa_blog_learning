import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite' // 自动导入
import Components from 'unplugin-vue-components/vite' // 组件注册
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // elementPlus
import Icons from 'unplugin-icons/vite' // icon相关
import IconsResolver from 'unplugin-icons/resolver' // icon相关

export default defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH, VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = loadEnv(
    mode,
    process.cwd()
  )
  const domain = {
    [VITE_PROXY_DOMAIN]: {
      target: VITE_PROXY_DOMAIN_REAL,
      // ws: true,
      changeOrigin: true
    }
  }
  const proxy = VITE_PROXY_DOMAIN_REAL.length > 0 ? domain : null

  return {
    base: VITE_PUBLIC_PATH, //打包路径
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        // imports: ['vue'],
        eslintrc: {
          enabled: true
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'] // 重点
          })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/index.scss" as *;`
        }
      }
    },
    //启动服务配置
    server: {
      host: '0.0.0.0',
      port: 8000,
      open: false,
      https: false,
      proxy
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  }
})

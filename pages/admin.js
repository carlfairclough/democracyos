import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { t, setLocale } from '../client/i18n'
const Admin = dynamic(import('../cms/components/admin'), {
  ssr: false
})


export default () => (
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{t('admin/title')} </title>
      <link rel='stylesheet' href='/static/global.css' />
    </Head>
    <Admin />
  </div>
)

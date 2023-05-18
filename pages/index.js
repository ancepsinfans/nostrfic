import Head from 'next/head'
import React from 'react'
import { useSubscribe } from 'nostr-hooks';
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [t, setT] = React.useState('')
  const { events, eose } = useSubscribe({

    relays: [
      'wss://relay.damus.io',
      'wss://relay.snort.social',
      'wss://eden.nostr.land',
      'wss://relay.nostr.info',
      'wss://offchain.pub',
      'wss://nostr-pub.wellorder.net',
      'wss://nostr.fmt.wiz.biz',
      'wss://nos.lol',
    ],
    filters: [
      {
        kinds: [30023],
        tags: [["d", ""], ["d", "not empty"]],
      }
    ],
  })

  React.useEffect(() => {

    const temp = events
      .filter(e => e.content.length > 25 * 6)
      .map(e => {
        const tagsObj = e.tags.reduce((acc, [key, value]) => {
          if (key in acc) {
            if (!Array.isArray(acc[key])) {
              acc[key] = [acc[key]];
            }
            acc[key].push(value);
          } else {
            acc[key] = value;
          }
          return acc;
        }, {});
        const final = { ...e, ...tagsObj }
        delete final.tags
        return final
      })
    setT(temp)
  }, [eose])

  console.log({ t })

  return (
    <>

      <main >

        <article>
          {
            eose ?

              <>
                {t.map(e => {


                  return (
                    <fieldset className='bucket' key={e.id}>
                      <h1>{e.title || null}</h1>
                      <aside>{moment.unix(e.created_at).format('YYYY-MM-DD HH:mm:ss') || null}</aside>
                      <h3>{e.summary || null}</h3>
                      {/* <img src={obj.image || null} /> */}
                      <ReactMarkdown>{e.content}</ReactMarkdown>
                    </fieldset>
                  )
                })}
              </>
              :
              <p>loading</p>
          }


        </article>
      </main >
    </>
  )
}

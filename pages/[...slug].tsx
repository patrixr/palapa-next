import { NextPageContext } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { render, PalapaError, PaSession } from "@palapa/core"
import { redirectTo } from '../lib/ssr/routing'

export interface PageProps {
  tree: PaSession
}

export default function Palapa(props: PageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

const NO_PROPS = Object.freeze({ props: {} });

/**
 * Renders the palapa tree and passes it to the page
 *
 * @export
 * @param {NextPageContext} ctx
 * @returns
 */
export async function getServerSideProps(ctx: NextPageContext) {
  const { slug = [] } = ctx.query;

  const [page] = slug as string[];
  
  try {
    const { root: { nodes }} = await render({ page })

    const tree = nodes.find((n) => n.type === "page" && n.name === page) || nodes[0];

    return { props: { page: tree } }
  } catch (e) {
    const { message, status } = (e as PalapaError);

    console.error(message);
    redirectTo(ctx, status === 404 ? '/404' : '/500')

    return NO_PROPS;
  }
}

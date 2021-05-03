import moment from 'moment'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import Layout from '~/layouts/default'
import ReactTooltip from 'react-tooltip'
import { ViewsIcon } from '~/utils/Icons'
import hydrate from 'next-mdx-remote/hydrate'
import { getAllPosts } from '~/utils/blogFiles'
import SponsorCard from '~/components/SponsorCard'
import renderToString from 'next-mdx-remote/render-to-string'

export default function BlogPost ({ title, publishedAt, content }) {
  const { theme } = useTheme()
  const hydratedContent = hydrate(content)
  const formattedData = moment(publishedAt).format('MMMM DD, YYYY')

  return (
    <>
      <Head>
        <title>{ title }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="w-full max-w-3xl mx-auto px-4 space-y-8">
          <div className="mt-4 md:mt-16">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center max-w-xl mx-auto">{ title }</h1>
          </div>
          <div className="flex items-center justify-between pb-8">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <img 
                  className="w-7 h-7 rounded-full"
                  src="/images/my-avatar.jpg" 
                />
              </div>
              <h3 className="text-sm text-gray-700 dark:text-gray-400 tracking-tight">Joshua Galit / { formattedData }</h3>
            </div>
            <div>
              <div className="flex items-center space-x-1 cursor-default text-gray-500 dark:text-gray-400" data-tip="Views">
                <span className="text-xs font-medium mt-0.5 line-clamp-1">245</span>
                <ViewsIcon className="w-4 h-4" />
              </div>
              <ReactTooltip 
                place="bottom" 
                type={ theme === 'light' ? 'dark' : 'light' } 
                effect="solid" 
              />
            </div>
          </div>
          <div className="prose dark:prose-dark prose-pink">{ hydratedContent }</div>
          <div className="pb-24">
            <SponsorCard />
          </div>
        </div>
      </Layout> 
    </>
  )
}

export async function getStaticPaths() {
  const allPosts = getAllPosts()
  return {
    paths: allPosts.map(post => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const allPosts = getAllPosts()
  
  const { data, content } = allPosts.find(post => post.slug === slug)
  const mdxSource = await renderToString(content)

  return {
    props: {
      ...data,
      content: mdxSource,
    }
  }
}
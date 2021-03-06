import Image from 'next/image';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { getDatabaseNews } from '../../lib/notion';
import { useEffect } from 'react';
import { dateFormat } from '../../lib/date';

const Blog = ({dataBlog}) => {
   const router = useRouter();
   const slug = str => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

   useEffect(() => {
      console.log(dataBlog)
   },[])

   return (
      <Layout pageTitle="Blog">
         <div className="mt-16 min-h-screen">
            <div className="container mx-auto py-16 md:px-12">
               <h2 className="mb-12 font-extrabold text-center text-4xl text-slate-700">ELDEEM NEWS</h2>
               <div className="grid md:grid-cols-2 grid-cols-1 gap-y-16 justify-items-center">
                  {
                     dataBlog && dataBlog.map(blog => (
                        <div className="md:w-96 w-80 cursor-pointer rounded-lg hover:shadow-lg p-6" onClick={() => router.push(`/blog/${slug(blog.properties.Title.title[0].plain_text)}`)} key={blog.id}>
                           <Image src="https://source.unsplash.com/600x325?building" className="max-w-4xl rounded-lg" width={600} height={325} />
                           <p className="text-slate-500">{dateFormat(blog.properties.Published_Date.date.start)}</p>
                           <h2 className="text-xl text-slate-700 font-bold">{blog.properties.Title.title[0].plain_text}</h2>
                           <p className="text-slate-300 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
      </Layout>
   )
}

export default Blog;

export const getServerSideProps = async () => {
   const dataBlog = await getDatabaseNews()

   return {
      props: {
         dataBlog,
      }
   }
}

import Head from 'next/head';
import Image from 'next/image';
import { contacts } from '~/data';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import Layout from '~/layouts/default';
import ContactForm from '~/components/ContactForm';
import { useToasts } from 'react-toast-notifications';
import { NextPage } from 'next';

interface ContactPageProps {}

const Contact: NextPage<ContactPageProps> = () => {
  const { addToast } = useToasts();

  const handleContact = async ({ name, email, message }, e) => {
    try {
      const mail = await emailjs.send(
        `${process.env.GMAIL_SERVICE_ID}`,
        `${process.env.GMAIL_TEMPLATE_ID}`,
        { name, email, message },
        `${process.env.GMAIL_USER_ID}`
      );

      if (mail) {
        addToast('Your message successfully sent!', {
          appearance: 'success',
          autoDismiss: true,
        });
      } else {
        addToast('Something went wrong try again!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      e.target.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | Joshua Galit</title>
        <meta name="description" content="Contact through email or phone" />
      </Head>
      <Layout>
        <div className="w-full max-w-5xl m-auto px-4 py-4 md:py-0">
          <div className="w-full h-full opacity-30 absolute">
            <Image
              src="/svgs/buble.svg"
              layout="fill"
              alt="Bubble Background"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-screen min-h-screen flex flex-col md:flex-row items-start md:items-center justify-between space-y-8"
          >
            <div className="flex flex-col space-y-10 md:space-y-20">
              <div className="flex flex-col space-y-5 md:space-y-8 w-full max-w-md z-50">
                <h1 className="font-black text-3xl md:text-5xl text-blue-twitter">
                  Contact me
                </h1>
                <p className="text-base text-gray-900 dark:text-white">
                  Send me a message and I will get back to you within 24 hours.
                </p>
              </div>
              <div className="flex flex-col space-y-3 md:space-y-5 z-50">
                {contacts.map(({ Icon, text }, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-6 text-gray-900 dark:text-white"
                  >
                    <Icon className="w-6 h-6 text-blue-twitter" />
                    <p className="text-base">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg w-full max-w-full md:max-w-lg px-8 py-10 bg-white shadow-md dark:bg-gray-900 z-50">
              <div className="relative w-full">
                <ContactForm onSubmit={handleContact} />
              </div>
            </div>
          </motion.div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
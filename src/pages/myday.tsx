import React from 'react';
import { mydaylist } from '~/data';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import Layout from '~/layouts/defaultLayout';
import { routeAnimation } from '~/animation';
import MyDayList from '~/components/MyDayList';
import MyDayHeader from '~/components/MyDayHeader';

const MyDay: NextPage<{}> = () => {
  return (
    <Layout
      headTitle="Diary | Joshua Galit"
      metaDescription="My Personal Diary Post every moment I feel the moment"
    >
      <motion.div
        variants={routeAnimation}
        initial="initial"
        animate="animate"
        className="inline-flex flex-col w-full mx-auto"
      >
        <MyDayHeader />
        <MyDayList mydaylist={mydaylist} />
      </motion.div>
    </Layout>
  );
};

export default MyDay;

import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import useSWR from "swr";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";

interface GetUserResponse {
  createdAt: Date;
  id: number;
  job: string;
  name: string;
}

type GetUserError = any;

const useUsers = () => {
  const { data, error, isValidating, mutate } = useSWR<
    GetUserResponse[],
    GetUserError
  >("/api/users");

  const users = useMemo(() => data, [data]);
  const isLoading = !error && !data;
  return { users, data, error, isValidating, mutate, isLoading };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const { users, isLoading: areUsersLoading, error, mutate } = useUsers();

  if (areUsersLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>

        <ul className={utilStyles.list}>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Job: {user.job}</p>
              </li>
            );
          })}
        </ul>

        <button
          onClick={async () => {
            await axios.post("/api/users", {
              name: "Vincent",
              job: "developer",
            });
            mutate();
          }}
        >
          Click to insert Users
        </button>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

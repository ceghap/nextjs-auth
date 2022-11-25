import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout/layout";
import { useSession, signOut, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h2>Authorized user Page</h2>

        <div>
          <h4>User: {session?.user?.name}</h4>
          <h4>Email: {session?.user?.email}</h4>
        </div>

        <div>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>

        <div>
          <Link href="/profile">Profile</Link>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session)
    return { redirect: { destination: "/login", permanent: false } };

  return {
    props: {
      session,
    },
  };
};

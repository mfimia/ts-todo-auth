import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import withAuth from "../components/withAuth";
import { useCredentials } from "../hooks/useCredentials";
import { UserCredentials, EmailsList } from "../types/credentials";

const emailsFetchUrl =
  process.env.NODE_ENV === "production"
    ? "" //TODO: add production url
    : "http://localhost:3000/api/users/emails";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(emailsFetchUrl);
  const emails: EmailsList = await res.json();
  return {
    props: {
      emails,
    },
  };
};

const emails: NextPage<{ emails: EmailsList }> = ({
  emails,
}: {
  emails: EmailsList;
}) => {
  const { checkAuthorization, token } = useCredentials();

  useEffect(() => {
    (async () => await checkAuthorization())();
  }, [token]);

  return (
    <ul>
      {emails.map(({ email }: { email: UserCredentials["email"] }) => (
        <li key={email}>{email}</li>
      ))}
    </ul>
  );
};

export default withAuth(emails);

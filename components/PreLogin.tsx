export const PreLogin = () => {
  return (
    <div>
      <p>
        The open source RSS feed reader designed to put <em>you</em> in control
        of the news that&apos;s important
      </p>
      <div>
        <h2>Start curating your newsfeed</h2>
        <a href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/github`}>
          Login with Github
        </a>
      </div>
    </div>
  );
};

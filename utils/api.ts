interface Props {
  url: string;
  token: string;
}

export const get = async <T>({ url, token }: Props): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};

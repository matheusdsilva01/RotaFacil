import { GetServerSideProps } from "next";

import { api } from "@/api";
import TrackLayout from "@/layouts/track.layout";
import { Track } from "@/types/tracks";

interface TracksPageProps {
  tracks: Track[];
}

const TracksPage = ({ tracks }: TracksPageProps) => {
  return <TrackLayout tracks={tracks} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const tracks = await api.get("/deslocamento").then(response => response.data);

  return { props: { tracks } };
};

export default TracksPage;

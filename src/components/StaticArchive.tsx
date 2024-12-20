import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { marked } from "marked";
import { useParams } from "react-router-dom";
import { placeHolderArchive } from "../state/staticData";
import embiggenImage from "../library/embiggenImage";
import customRenderer from "../library/markedCustomRenderer";
import formatTimeStamp from "../library/formatTimeStamp";
import PocketBaseAtom from "../state/PocketBaseAtom";

const URL = "https://billy-blog.pockethost.io/api/files/";

marked.setOptions({ renderer: customRenderer });

export default function StaticArchive() {
  const [errTimer, setErrTiemr] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [archive, setArchive] = useState<BillyBlogArchive>(placeHolderArchive[0] as BillyBlogArchive);
  const params = useParams();
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    if (params.archiveId) {
      pb.collection('archive').getOne<BillyBlogArchive>(params.archiveId)
        .then((response) => { setArchive((response)) })
        .catch((error) => { setErrMessage(error.message) })
        .finally(() => {
          setTimeout(() => {
            setErrTiemr(true);
          }, 5000);
        });
    }
  }, []);

  let parsedBody = archive.body;
  parsedBody = parsedBody.replaceAll("\\r", "");
  parsedBody = parsedBody.replaceAll("\\n", "\n");
  parsedBody = parsedBody.replaceAll("\\", "");
  parsedBody = String(marked.parse(parsedBody));

  return (
    <>
      <p className="error_message">{errMessage.length > 2 && archive.id.length < 2 && errTimer ? errMessage.toString() : ""}</p>
      <div key={archive.id + 'div'} className="post">
        <h3 key={archive.id + 'title'} className="post_title">{archive.title}</h3>
        <p key={archive.id + 'timestamp'} className="post_time_stamp">{formatTimeStamp(archive.timeStamp)}</p>
        <p key={archive.id + 'body'} className="post_body" dangerouslySetInnerHTML={{ __html: parsedBody }}></p>
        {archive.attachment
          ?
          <img
            className="post_attachment"
            key={archive.id + 'attachment'}
            src={`${URL}${archive.collectionId}/${archive.id}/${archive.attachment}`}
            onClick={(e) => embiggenImage(e.currentTarget)}
          />
          :
          ""}
      </div>
    </>
  );
}

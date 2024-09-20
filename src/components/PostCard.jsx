import { Link } from "react-router-dom";

const PostCard = ({userId, id, title, body}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          {title}
        </div>
        <div className="card-body">
          <div className="card-preview-text">
            { body }
          </div>
        </div>
        <div className="card-footer">
          <Link className="btn" to={`${id}`}>
            View
          </Link>
          <Link className="btn" to={`${id}/edit`}>
            Edit
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;

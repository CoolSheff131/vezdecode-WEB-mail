import './style/MailPage.css';

const MailPage = ({ data }) => {
  return (
    <div>
      <header>
        <h1>{data.title}</h1>
        <div className="header__metadata-wrapper">
          <img className="header__metadata-avatar" src={data.author.avatar}></img>
          <div className="header__metadata">
            <div className="header__metadata-name">
              {data.author.name}
              <div className="header__metadata-mail">{data.author.email}</div>
            </div>
            <div className="header__metadata-date-time">{data.dateTime}</div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="main__text">{data.text}</div>
        {data.file && (
          <div className="main__files-wrapper">
            <div className="main__file">
              <img
                className="main__file-preview"
                src={data.file.preview}
                alt={data.file.filePath}
              />
              <div className="main__file-filePath">{data.file.filePath}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MailPage;

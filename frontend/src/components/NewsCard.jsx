const cardStyle = {
	border: "1px solid #e5e7eb",
	borderRadius: "10px",
	padding: "16px",
	backgroundColor: "#ffffff",
	boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
	display: "flex",
	flexDirection: "column",
	gap: "10px",
};

const imageStyle = {
	width: "100%",
	height: "180px",
	objectFit: "cover",
	borderRadius: "8px",
};

const titleStyle = {
	fontSize: "18px",
	fontWeight: 600,
	margin: 0,
};

const descriptionStyle = {
	fontSize: "14px",
	color: "#4b5563",
	margin: 0,
};

const linkStyle = {
	alignSelf: "flex-start",
	textDecoration: "none",
	color: "#2563eb",
	fontWeight: 600,
};

const NewsCard = ({ article }) => {
	if (!article) {
		return null;
	}

	const { urlToImage, title, description, url } = article;

	return (
		<article style={cardStyle}>
			{urlToImage ? (
				<img src={urlToImage} alt={title || "News image"} style={imageStyle} />
			) : null}
			{title ? <h3 style={titleStyle}>{title}</h3> : null}
			{description ? <p style={descriptionStyle}>{description}</p> : null}
			{url ? (
				<a href={url} target="_blank" rel="noreferrer" style={linkStyle}>
					Read More
				</a>
			) : null}
		</article>
	);
};

export default NewsCard;

export const Layout = ({ title, children }) => {
	return (
		<div className='content-wrapper'>
			<div className='content-title'>{title}</div>
			<div className='content-body'>{children}</div>
		</div>
	)
}

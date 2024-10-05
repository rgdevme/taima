let batchProcessTasks = async items => {
	await fetch(`localhost:8081/playground`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(items)
	})
	console.log('done')
}

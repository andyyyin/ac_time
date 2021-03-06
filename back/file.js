const fs = require("fs")

exports.readFile = (path) => {
	return new Promise(resolve => {
		fs.readFile(path, (err, data) => {
			if (err) {
				console.error(err)
				resolve(false)
			} else {
				try	{
					resolve(JSON.parse(data))
				} catch (e) {
					console.error(e)
					console.log('报错文件：' + path)
				}
			}
		})
	})
}

exports.writeFile = (path, content) => {
	return new Promise(resolve => {
		if (typeof content !== 'string') content = JSON.stringify(content)
		fs.writeFile(path, content, 'utf8', (err) => {
			if (err) {
				console.error(err)
				resolve(false)
			}
			resolve(true)
		})
	})
}

exports.readOrInitFile = (path) => {
	return new Promise(resolve => {
		let initContent = '{}'
		fs.readFile(path, 'utf8', (err, data) => {
			if (!err) {
				if (!data) data = initContent
				resolve(JSON.parse(data))
			} else if (err.code === 'ENOENT') {
				fs.writeFile(path, initContent, (err) => {
					if (err) console.error(err)
					resolve({})
				})
			} else {
				console.error(err)
				resolve(false)
			}
		})
	})
}


exports.readDir = (path) => {
	return new Promise(resolve => {
		fs.readdir(path, function (err, files) {
			if (err) {
				console.error(err)
				resolve(false)
			}
			resolve(files)
		})
	})
}

exports.makeDir = (path) => {
	return new Promise(resolve => {
		if (fs.existsSync(path)) {
			resolve(true)
			return
		}
		fs.mkdir(path, { recursive: true }, (err) => {
			if (err) {
				console.error(err)
				resolve(false)
			}
			resolve(true)
		});
	})
}

exports.exist = (path) => {
	return new Promise(resolve => {
		resolve(fs.existsSync(path))
	})
}

exports.copyFile = (src, target) => {
	return new Promise(resolve => {
		fs.copyFile(src, target, err => {
			if (err) {
				console.error(err)
				resolve(false)
			}
			resolve(true)
		})
	})
}

exports.isDirectory = (path) => {
	return new Promise(resolve => {
		fs.stat(path, (err, stat) => {
			if (err) {
				console.error(err)
				resolve(false)
			}
			resolve(stat.isDirectory())
		})
	})
}
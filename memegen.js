const {
    createCanvas, loadImage,
} = require('canvas')

/**
 * Draw rounded image
 * @param {Object} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number} size
 * @param {Object} image
 */
const drawRoundedImage = (ctx, x, y, radius, size, image) => {

    const diff = size / 2 - radius
    ctx.save()
    ctx.beginPath()
    ctx.arc(x + radius + diff, y + radius + diff, radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = 'rgba(255,255,255,0)'
    ctx.stroke()
    ctx.clip()
    ctx.drawImage(image, x, y, size, size)
    ctx.restore()

}

/**
 * Generate leaderboard for given users
 * @param {string} baseURL
 * @param {string} avatar
 * @param {number} x
 * @param {number} y
 * @param {number} size
 * @returns {Promise<Buffer>}
 */
module.exports = async (baseURL, avatar, x, y, size) => {

    const baseImage = await loadImage(baseURL)

    const canvas = createCanvas(baseImage.width, baseImage.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(baseImage, 0, 0)

    //
    // Edit only after this
    //
    const avatarImage = await loadImage(avatar)
    // Draw avatar
    drawRoundedImage(ctx, x, y, size / 2, size, avatarImage)

    return canvas.toBuffer()

}

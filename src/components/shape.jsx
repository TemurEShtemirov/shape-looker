const Shape = ({ x, y, size, color, onclick }) => {
    const style = {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
        backgroundColor: color,
        position: 'absolute',
        borderRadius: size > 50 ? "8px" : "50%",
        cursor: "poiniter",
        transition: 'all 0.2 ease'
    };
    return <div style = { style } onClick = { onclick } />
}

export default Shape;
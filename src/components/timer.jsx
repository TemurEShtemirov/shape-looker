const Timer = ({ time }) => {
    return (
        <div className="timer">
            <h2>Time Remaining: {time}s</h2>
            //NOTE Visual Tip: Make a bar that shrinks based on (time / 5) * 100 */
            <div style={{
                width: `${(time / 5) * 100}%`,
                height: '10px',
                backgroundColor: time < 2 ? 'red' : 'lime',
                transition: 'width 1s linear'
            }} />
        </div>
    );
};

export default Timer;
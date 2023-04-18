window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let capital = Number(document.getElementById('capital').value);
        let losePercent = Number(document.getElementById('losePercent').value);
        let breakEvenPercent = Number(document.getElementById('breakEvenPercent').value);
        let win1Percent = Number(document.getElementById('win1Percent').value);
        let win2Percent = Number(document.getElementById('win2Percent').value);
        let win3Percent = Number(document.getElementById('win3Percent').value);
        let numTrades = 100;
        let cycles = Number(document.getElementById('cycles').value)
        let result_p = document.getElementById('result_p');
        let best = document.getElementById('best');
        let all = document.getElementById('all');
        let loseRatio = losePercent / 100;
        let breakEvenRatio = breakEvenPercent / 100;
        let win1Ratio = win1Percent / 100;
        let win2Ratio = win2Percent / 100;
        let win3Ratio = win3Percent / 100;

        let totalCapital = capital;
        let cycleResults = [];
        for (let i = 0; i < cycles; i++) {
            for (let j = 0; j < numTrades; j++) {
                let random = Math.random();
                if (random < loseRatio) {
                    totalCapital *= (1 - 0.01);
                } else if (random < loseRatio + breakEvenRatio) {
                    // do nothing, totalCapital remains the same
                } else if (random < loseRatio + breakEvenRatio + win1Ratio) {
                    totalCapital *= (1 + 0.01);
                } else if (random < loseRatio + breakEvenRatio + win1Ratio + win2Ratio) {
                    totalCapital *= (1 + 0.02);
                } else if (random < loseRatio + breakEvenRatio + win1Ratio + win2Ratio + win3Ratio) {
                    totalCapital *= (1 + 0.03);
                }
            }
            cycleResults.push(totalCapital);
            console.log(cycleResults[i].toFixed(2), 'are results')

        }

        result_p.textContent = ''
        all.innerHTML = ''
        for (let i = 0; i < cycleResults.length; i++) {
            all.innerHTML += `
            <thead>
            <tr>
                <th>Cycle</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${i + 1}</td>
                <td>$${cycleResults[i].toFixed(2)}</td>
            </tr>
        </tbody>
            `
        }
        if (totalCapital > capital) {
            best.innerHTML = `Your total capital <span style="color: green">increased</span> from <span style="color:red">$${capital.toFixed(2)}</span> to <span style="color:green">$${totalCapital.toFixed(2)}</span>, after <span style="color:blue">${numTrades * cycles}</span> trades.`;
        } else {
            best.innerHTML = `Your total capital <span style="color: red">decreased</span> from <span style="color:green">$${capital.toFixed(2)}</span> to <span style="color:red">$${totalCapital.toFixed(2)}</span>, after <span style="color:blue">${numTrades * cycles}</span> trades.`;
        }
    });
}); 

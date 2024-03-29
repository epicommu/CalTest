document.addEventListener('DOMContentLoaded', function() {
    // 차트 초기화
    const ctx = document.getElementById('investmentChart').getContext('2d');
    const investmentChart = new Chart(ctx, {
        type: 'line', // 차트 유형을 line으로 변경하여 년도별 변화를 보여줌
        data: {
            labels: [], // 년도별 라벨이 들어갈 자리
            datasets: [
                {
                    label: '납입 원금 (만원)',
                    data: [], // 납입 원금 데이터
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    fill: false // 선 차트 스타일
                },
                {
                    label: '최종 금액 (만원)',
                    data: [], // 최종 금액 데이터
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false // 선 차트 스타일
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const annualContributionSlider = document.getElementById('annualContribution');
    const contributionPeriodSlider = document.getElementById('contributionPeriod');
    const investmentOptions = document.getElementsByName('investment');
    const annualContributionValue = document.getElementById('annualContributionValue');
    const contributionPeriodValue = document.getElementById('contributionPeriodValue');
    const expectedReturns = document.getElementById('expectedReturns');
    const totalPrincipal = document.getElementById('totalPrincipal');
    const finalAmount = document.getElementById('finalAmount');
    const totalReturnRate = document.getElementById('totalReturnRate');

    function calculateResults() {
        const annualContribution = parseInt(annualContributionSlider.value, 10);
        const contributionPeriod = parseInt(contributionPeriodSlider.value, 10);
        const totalPrincipalValue = annualContribution * contributionPeriod;
        let finalAmountValue = 0;
        let investmentReturnRate = 0;

        investmentOptions.forEach(option => {
            if (option.checked) {
                investmentReturnRate = parseInt(option.value, 10) / 100;
                finalAmountValue = annualContribution * ((Math.pow(1 + investmentReturnRate, contributionPeriod) - 1) / investmentReturnRate);
            }
        });

        const totalReturns = finalAmountValue - totalPrincipalValue;
        const totalReturnRateValue = (totalReturns / totalPrincipalValue) * 100;

        // 결과 업데이트
        totalPrincipal.textContent = totalPrincipalValue.toFixed(2) + '만원';
        finalAmount.textContent = finalAmountValue.toFixed(2) + '만원';
        expectedReturns.textContent = totalReturns.toFixed(2) + '만원';
        totalReturnRate.textContent = totalReturnRateValue.toFixed(2) + '%';

        // 차트 데이터 업데이트
        updateChart(annualContribution, contributionPeriod, investmentReturnRate);
    }

    // 차트 업데이트 함수 추가
    function updateChart(annualContribution, contributionPeriod, investmentReturnRate) {
        const years = Array.from({length: contributionPeriod}, (_, i) => (i + 1).toString() + '년');
        const totalPrincipals = Array.from({length: contributionPeriod}, (_, i) => (annualContribution * (i + 1)));
        const finalAmounts = totalPrincipals.map((principal, i) => Math.round(annualContribution * (((1 + investmentReturnRate) ** (i + 1) - 1) / investmentReturnRate)));

        investmentChart.data.labels = years;
        investmentChart.data.datasets[0].data = totalPrincipals;
        investmentChart.data.datasets[1].data = finalAmounts;
        investmentChart.update();
    }

    annualContributionSlider.addEventListener('input', function() {
        annualContributionValue.textContent = this.value + '만원';
        calculateResults();
    });

    contributionPeriodSlider.addEventListener('input', function() {
        contributionPeriodValue.textContent = this.value + '년';
        calculateResults();
    });

    investmentOptions.forEach(option => {
        option.addEventListener('change', calculateResults);
    });
});

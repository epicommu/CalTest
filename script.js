document.addEventListener('DOMContentLoaded', function() {
    // 차트 초기화
    const ctx = document.getElementById('investmentChart').getContext('2d');
    const investmentChart = new Chart(ctx, {
        type: 'bar', // 또는 'line', 'pie' 등 차트 유형 선택
        data: {
            labels: ['납입 원금', '최종 금액'],
            datasets: [{
                label: '금액 (만원)',
                data: [0, 0], // 초기 데이터
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
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
        investmentChart.data.datasets[0].data = [totalPrincipalValue, finalAmountValue];
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

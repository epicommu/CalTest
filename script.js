document.addEventListener('DOMContentLoaded', function() {
    const annualContributionSlider = document.getElementById('annualContribution');
    const contributionPeriodSlider = document.getElementById('contributionPeriod');
    const investmentOptions = document.getElementsByName('investment');
    const annualContributionValue = document.getElementById('annualContributionValue');
    const contributionPeriodValue = document.getElementById('contributionPeriodValue');
    const expectedReturns = document.getElementById('expectedReturns');
    // 새로 추가된 요소에 대한 참조
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
            if(option.checked) {
                investmentReturnRate = parseInt(option.value, 10) / 100;
                // 올바른 최종 금액 계산 공식 적용
                finalAmountValue = annualContribution * ((Math.pow(1 + investmentReturnRate, contributionPeriod) - 1) / investmentReturnRate);
            }
        });
    
        const totalReturns = finalAmountValue - totalPrincipalValue;
        const totalReturnRateValue = (totalReturns / totalPrincipalValue) * 100;
    
        // 결과 업데이트
        totalPrincipal.textContent = totalPrincipalValue.toFixed(2) + '만원';
        finalAmount.textContent = finalAmountValue.toFixed(2) + '만원';
        expectedReturns.textContent = totalReturns.toFixed(2) + '만원'; // '만원' 단위 추가
        totalReturnRate.textContent = totalReturnRateValue.toFixed(2) + '%';
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

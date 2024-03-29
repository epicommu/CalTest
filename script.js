document.addEventListener('DOMContentLoaded', function() {
    const annualContributionSlider = document.getElementById('annualContribution');
    const contributionPeriodSlider = document.getElementById('contributionPeriod');
    const investmentOptions = document.getElementsByName('investment');
    const annualContributionValue = document.getElementById('annualContributionValue');
    const contributionPeriodValue = document.getElementById('contributionPeriodValue');
    const expectedReturns = document.getElementById('expectedReturns');

    function calculateReturns() {
        const annualContribution = parseInt(annualContributionSlider.value, 10);
        const contributionPeriod = parseInt(contributionPeriodSlider.value, 10);
        let investmentReturn = 0;
        investmentOptions.forEach(option => {
            if(option.checked) {
                const annualReturnRate = parseInt(option.value, 10) / 100;
                investmentReturn = annualContribution * Math.pow((1 + annualReturnRate), contributionPeriod);
            }
        });
        expectedReturns.textContent = investmentReturn.toFixed(2);
    }

    annualContributionSlider.addEventListener('input', function() {
        annualContributionValue.textContent = this.value;
        calculateReturns();
    });

    contributionPeriodSlider.addEventListener('input', function() {
        contributionPeriodValue.textContent = this.value;
        calculateReturns();
    });

    investmentOptions.forEach(option => {
        option.addEventListener('change', calculateReturns);
    });
});


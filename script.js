// 防诈骗公益网站 - JavaScript交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initExpandButtons();
    initSelfCheckTest();
    initSmoothScroll();
    initScrollAnimations();
});

// 1. 三问自查卡片展开/收起功能
function initExpandButtons() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.question-card');
            const isExpanded = card.classList.contains('expanded');
            
            if (isExpanded) {
                card.classList.remove('expanded');
                this.textContent = '展开详情';
            } else {
                card.classList.add('expanded');
                this.textContent = '收起详情';
            }
        });
    });
}

// 2. 自查测试功能
function initSelfCheckTest() {
    const checkButton = document.getElementById('checkResult');
    const testResult = document.getElementById('testResult');
    const checkboxes = document.querySelectorAll('.test-checkbox');
    
    if (checkButton) {
        checkButton.addEventListener('click', function() {
            // 统计选中的复选框数量
            const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
            
            // 移除之前的风险等级类
            testResult.classList.remove('low-risk', 'medium-risk', 'high-risk');
            
            // 根据选中数量评估风险
            let riskLevel = '';
            let riskMessage = '';
            let riskIcon = '';
            let advice = '';
            
            if (checkedCount === 0) {
                riskLevel = 'low-risk';
                riskIcon = '';
                riskMessage = '风险评估：低风险';
                advice = '目前看来您的情况较为安全，但仍需保持警惕。建议：<br>• 继续保持防范意识<br>• 定期学习防诈骗知识<br>• 向家人朋友普及反诈知识';
            } else if (checkedCount <= 2) {
                riskLevel = 'medium-risk';
                riskIcon = '️';
                riskMessage = '风险评估：中等风险';
                advice = '您遇到的情况存在一定风险，请提高警惕！建议：<br>• 立即停止与对方的一切交流<br>• 不要进行任何转账操作<br>• 通过官方渠道核实信息<br>• 如有疑问，拨打96110咨询';
            } else {
                riskLevel = 'high-risk';
                riskIcon = '';
                riskMessage = '风险评估：高风险！';
                advice = '<strong>警告：您很可能正在遭遇诈骗！</strong><br>请立即采取以下措施：<br>• <strong>立即停止所有操作，不要转账！</strong><br>• 保存所有聊天记录和证据<br>• <strong>立即拨打96110或110报警</strong><br>• 告知家人朋友，寻求帮助<br>• 如已转账，立即联系银行冻结账户';
            }
            
            // 显示结果
            testResult.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 1rem;">${riskIcon}</div>
                <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">${riskMessage}</div>
                <div style="line-height: 1.8;">${advice}</div>
                ${checkedCount > 0 ? '<div style="margin-top: 1.5rem; padding: 1rem; background-color: rgba(255,255,255,0.2); border-radius: 10px; font-weight: bold;"> 全国反诈专线：96110（24小时）</div>' : ''}
            `;
            
            testResult.classList.add('show', riskLevel);
            
            // 滚动到结果区域
            testResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
}

// 3. 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 4. 滚动动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.question-card, .case-card, .tip-card, .report-method');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// 5. 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 6. 下载APP按钮功能
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        alert('请前往应用商店搜索"国家反诈中心"下载官方APP\n\niOS用户：App Store\nAndroid用户：各大应用商店\n\n或扫描公安机关提供的官方二维码下载');
    });
}

// 7. 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 按ESC键收起所有展开的卡片
    if (e.key === 'Escape') {
        const expandedCards = document.querySelectorAll('.question-card.expanded');
        expandedCards.forEach(card => {
            card.classList.remove('expanded');
            const button = card.querySelector('.expand-btn');
            if (button) {
                button.textContent = '展开详情';
            }
        });
    }
});

// 8. 添加复选框点击动画
document.querySelectorAll('.test-option').forEach(option => {
    option.addEventListener('click', function(e) {
        // 如果点击的不是复选框本身，则切换复选框状态
        if (e.target.tagName !== 'INPUT') {
            const checkbox = this.querySelector('.test-checkbox');
            checkbox.checked = !checkbox.checked;
        }
        
        // 添加点击动画
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// 9. 统计功能 - 记录用户访问（仅本地存储，不上传）
function trackVisit() {
    if (localStorage) {
        const visits = parseInt(localStorage.getItem('antiScamVisits') || '0');
        localStorage.setItem('antiScamVisits', (visits + 1).toString());
        
        // 可以在控制台显示访问次数（仅用于演示）
        console.log(`您是第 ${visits + 1} 次访问本网站，感谢您关注防诈骗知识！`);
    }
}

trackVisit();

// 10. 添加紧急求助浮动按钮（可选）
function createEmergencyButton() {
    const emergencyBtn = document.createElement('div');
    emergencyBtn.innerHTML = '📞';
    emergencyBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
        z-index: 999;
        transition: transform 0.3s, box-shadow 0.3s;
    `;
    
    emergencyBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.6)';
    });
    
    emergencyBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
    });
    
    emergencyBtn.addEventListener('click', function() {
        const message = ` 紧急求助信息 \n\n如果您正在遭遇诈骗，请立即：\n\n1. 停止所有转账操作\n2. 保存聊天记录和证据\n3. 拨打报警电话：110\n4. 拨打反诈专线：96110\n5. 告知家人朋友\n\n时间就是金钱，立即行动！`;
        
        if (confirm(message + '\n\n点击"确定"拨打96110（需要手机支持）')) {
            window.location.href = 'tel:96110';
        }
    });
    
    document.body.appendChild(emergencyBtn);
    
    // 添加脉冲动画
    setInterval(() => {
        emergencyBtn.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            emergencyBtn.style.animation = '';
        }, 1000);
    }, 3000);
}

// 添加脉冲动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// 创建紧急求助按钮
createEmergencyButton();

// 11. 打印友好提示
console.log('%c防诈骗公益网站', 'color: #e74c3c; font-size: 24px; font-weight: bold;');
console.log('%c全民反诈 人人有责', 'color: #3498db; font-size: 16px;');
console.log('%c遇到诈骗请拨打：96110', 'color: #27ae60; font-size: 14px; font-weight: bold;');
console.log('');
console.log(' 提示：按 ESC 键可以收起所有展开的卡片');

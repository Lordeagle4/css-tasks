        const canvas = document.getElementById('chart');
        const ctx = canvas.getContext('2d');

        // Set canvas resolution
        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            drawChart();
        }

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            seen: [45, 35, 20, 55, 25, 30, 28],
            sales: [48, 38, 22, 50, 18, 35, 25]
        };

        function drawChart() {
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            const padding = { left: 40, right: 40, top: 20, bottom: 40 };
            const chartW = w - padding.left - padding.right;
            const chartH = h - padding.top - padding.bottom;

            ctx.clearRect(0, 0, w, h);

            // Draw Y-axis labels and grid
            const yLabels = [0, 20, 40, 60];
            ctx.font = '11px sans-serif';
            ctx.fillStyle = '#999';
            ctx.strokeStyle = '#f0f0f0';
            ctx.lineWidth = 1;

            yLabels.forEach(label => {
                const y = padding.top + chartH - (label / 60) * chartH;
                ctx.fillText(label + 'K', 10, y + 4);
                
                ctx.beginPath();
                ctx.moveTo(padding.left, y);
                ctx.lineTo(w - padding.right, y);
                ctx.stroke();
            });

            // Draw bars
            const barWidth = 18;
            const groupWidth = chartW / data.labels.length;
            const maxValue = 60;

            data.labels.forEach((label, i) => {
                const x = padding.left + i * groupWidth + groupWidth / 2;
                const seenH = (data.seen[i] / maxValue) * chartH;
                const salesH = (data.sales[i] / maxValue) * chartH;

                // Seen product bar (light gray)
                ctx.fillStyle = '#e8e8e8';
                ctx.beginPath();
                ctx.roundRect(x - barWidth - 3, padding.top + chartH - seenH, barWidth, seenH, [8, 8, 0, 0]);
                ctx.fill();

                // Sales bar (blue)
                ctx.fillStyle = '#5b6ff5';
                ctx.beginPath();
                ctx.roundRect(x + 3, padding.top + chartH - salesH, barWidth, salesH, [8, 8, 0, 0]);
                ctx.fill();

                // X-axis label
                ctx.fillStyle = '#999';
                ctx.textAlign = 'center';
                ctx.fillText(label, x, h - 15);
            });

            // Highlight April
            const aprIndex = 3;
            const aprX = padding.left + aprIndex * groupWidth + groupWidth / 2;
            
            // Add dots above April bars
            ctx.fillStyle = '#1a1a1a';
            ctx.beginPath();
            ctx.arc(aprX - 10, padding.top + chartH - (data.seen[aprIndex] / maxValue) * chartH - 15, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(aprX + 10, padding.top + chartH - (data.sales[aprIndex] / maxValue) * chartH - 15, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // CanvasRenderingContext2D.prototype.roundRect polyfill
        if (!CanvasRenderingContext2D.prototype.roundRect) {
            CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
                if (w < 2 * r) r = w / 2;
                if (h < 2 * r) r = h / 2;
                this.moveTo(x + r, y);
                this.arcTo(x + w, y, x + w, y + h, r);
                this.arcTo(x + w, y + h, x, y + h, r);
                this.arcTo(x, y + h, x, y, r);
                this.arcTo(x, y, x + w, y, r);
                this.closePath();
            };
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
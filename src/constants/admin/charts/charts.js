export const renderRevenueChart = () => {
  const canvas = revenueChartRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = dashboardData.revenueByMonth;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const stepX = chartWidth / (data.length - 1);

  // Draw grid lines
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
    ctx.stroke();
  }

  // Draw revenue line with gradient
  const gradient = ctx.createLinearGradient(
    0,
    padding,
    0,
    canvas.height - padding,
  );
  gradient.addColorStop(0, "#3B82F6");
  gradient.addColorStop(1, "#1E40AF");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = padding + stepX * index;
    const y =
      canvas.height - padding - (point.revenue / maxRevenue) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    // Draw data points
    ctx.save();
    ctx.fillStyle = "#3B82F6";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  });

  ctx.stroke();

  // Draw area under curve
  ctx.save();
  const areaGradient = ctx.createLinearGradient(
    0,
    padding,
    0,
    canvas.height - padding,
  );
  areaGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
  areaGradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");

  ctx.fillStyle = areaGradient;
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Draw labels
  ctx.fillStyle = "#9CA3AF";
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = "center";

  data.forEach((point, index) => {
    const x = padding + stepX * index;
    ctx.fillText(point.month, x, canvas.height - 10);
  });
};

export const renderMembershipChart = () => {
  const canvas = membershipChartRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = dashboardData.usersByMembership;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const innerRadius = radius * 0.6;

  let currentAngle = -Math.PI / 2;

  data.forEach((segment, index) => {
    const sliceAngle = (2 * Math.PI * segment.percentage) / 100;

    // Create gradient for each segment
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      innerRadius,
      centerX,
      centerY,
      radius,
    );
    gradient.addColorStop(0, segment.color + "80");
    gradient.addColorStop(1, segment.color);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(
      centerX,
      centerY,
      innerRadius,
      currentAngle + sliceAngle,
      currentAngle,
      true,
    );
    ctx.closePath();
    ctx.fill();

    // Add glow effect
    ctx.shadowColor = segment.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    currentAngle += sliceAngle;
  });

  // Draw center circle
  const centerGradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    innerRadius,
  );
  centerGradient.addColorStop(0, "#1F2937");
  centerGradient.addColorStop(1, "#111827");

  ctx.fillStyle = centerGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
  ctx.fill();
};

export const renderHourlyChart = () => {
  const canvas = hourlyChartRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const data = dashboardData.hourlyBookings;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 30;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  const maxBookings = Math.max(...data.map((d) => d.bookings));
  const barWidth = chartWidth / data.length - 4;

  data.forEach((point, index) => {
    const x = padding + (chartWidth / data.length) * index + 2;
    const barHeight = (point.bookings / maxBookings) * chartHeight;
    const y = canvas.height - padding - barHeight;

    // Create gradient for bars
    const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding);
    gradient.addColorStop(0, "#10B981");
    gradient.addColorStop(1, "#059669");

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Add glow effect for peak hours
    if (point.bookings > maxBookings * 0.8) {
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 15;
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.shadowBlur = 0;
    }

    // Draw labels
    ctx.fillStyle = "#6B7280";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(x + barWidth / 2, canvas.height - 5);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(point.hour, 0, 0);
    ctx.restore();
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

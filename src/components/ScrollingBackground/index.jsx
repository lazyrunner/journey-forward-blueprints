import React, { useState, useEffect, useRef } from 'react';

const ScrollingBackground = ({children}) => {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const linesRef = useRef([]);
  const animationRef = useRef();

  const colors = ['#f39d38', '#4984b5', '#a4d5df'];

  // Initialize lines
const directions = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
 const initializeLines = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const lines = [];
    const numLines = 5;

    for (let i = 0; i < numLines; i++) {
      lines.push({
        id: i,
        points: [{
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height
        }],
        color: colors[Math.floor(Math.random() * colors.length)],
        direction:  directions[Math.floor(Math.random() * directions.length)],
        segmentLength: 15 + Math.random() * 25,
        branchProbability: 0.1,
        maxLength: 50 + Math.random() * 100,
        speed: 0.5 + Math.random() * 0.5,
        branches: []
      });
    }

    linesRef.current = lines;
  };

  // Grow lines based on scroll progress
  const growLines = (progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    linesRef.current.forEach(line => {
      const targetLength = Math.floor(progress * line.maxLength);
      
      // Grow main line
      while (line.points.length < targetLength) {
        const lastPoint = line.points[line.points.length - 1];
        
        // Add some randomness to direction
        if (Math.random() < 0.3) { // 30% chance to change direction
          line.direction = directions[Math.floor(Math.random() * directions.length)];
        }
        
        const newPoint = {
          x: lastPoint.x + Math.cos(line.direction) * line.segmentLength,
          y: lastPoint.y + Math.sin(line.direction) * line.segmentLength
        };

        // Wrap around screen edges
        if (newPoint.x < 0) newPoint.x = canvas.width;
        if (newPoint.x > canvas.width) newPoint.x = 0;
        if (newPoint.y < 0) newPoint.y = canvas.height;
        if (newPoint.y > canvas.height) newPoint.y = 0;

        line.points.push(newPoint);

        // Create branches occasionally
        if (Math.random() < line.branchProbability && line.branches.length < 3) {
          line.branches.push({
            startIndex: line.points.length - 1,
            points: [{ ...newPoint }],
            direction: directions[Math.floor(Math.random() * directions.length)],
            maxLength: 20 + Math.random() * 30
          });
        }
      }

      // Grow branches
      line.branches.forEach(branch => {
        const branchTargetLength = Math.floor(progress * branch.maxLength);
        while (branch.points.length < branchTargetLength) {
          const lastPoint = branch.points[branch.points.length - 1];
          
          // Change branch direction at 90-degree angles randomly
          const directions = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
          if (Math.random() < 0.3) { // 30% chance to change direction
            branch.direction = directions[Math.floor(Math.random() * directions.length)];
          }
          
          const newPoint = {
            x: lastPoint.x + Math.cos(branch.direction) * (line.segmentLength * 0.7),
            y: lastPoint.y + Math.sin(branch.direction) * (line.segmentLength * 0.7)
          };

          // Wrap around screen edges
          if (newPoint.x < 0) newPoint.x = canvas.width;
          if (newPoint.x > canvas.width) newPoint.x = 0;
          if (newPoint.y < 0) newPoint.y = canvas.height;
          if (newPoint.y > canvas.height) newPoint.y = 0;

          branch.points.push(newPoint);
        }
      });

      // Draw main line
      if (line.points.length > 1) {
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        
        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        ctx.stroke();

        // Draw branches
        line.branches.forEach(branch => {
          if (branch.points.length > 1) {
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 8;
            
            ctx.beginPath();
            ctx.moveTo(branch.points[0].x, branch.points[0].y);
            
            for (let i = 1; i < branch.points.length; i++) {
              ctx.lineTo(branch.points[i].x, branch.points[i].y);
            }
            ctx.stroke();
          }
        });
      }
    });
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(scrollTop / Math.max(docHeight, 1), 1);
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas setup and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeLines();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      growLines(scrollProgress);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress]);

  return (
    <div style={{position:"relative"}}>
      {/* Fixed background canvas */}
      <canvas
        ref={canvasRef}
        style={{ background: 'transparent', position:"fixed", opacity:"5%" }}
      />
      
   <div >
        {children}
      </div>
    </div>
  );
};

export default ScrollingBackground;
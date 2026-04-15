const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('[data-dir="prev"]');
const nextBtn = document.querySelector('[data-dir="next"]');

const TRANSITION_MS = 1400;

const resourceData = {
  scene: [
    {
      img: './resources.image/ISO.jpg',
      alt: 'ISO',
      title: 'ISO',
      desc: '实验数据采集与设备控制终端，支持实时监控与远程操控，保障测试精准高效。',
    },
    {
      img: './resources.image/TS.webp',
      alt: 'TS 16949',
      title: 'TS 16949',
      desc: '国际汽车行业质量管理标准，规范实验流程，确保过程可追溯、结果可靠。',
    },
    {
      img: './resources.image/高低温测试.jpg',
      alt: '高低温测试',
      title: '高低温测试',
      desc: '模拟高温与极寒环境，验证车辆启动性能、系统稳定性与零部件耐久性。',
    },
    {
      img: './resources.image/盐雾.jpeg',
      alt: '盐雾',
      title: '盐雾',
      desc: '加速腐蚀测试，评估金属部件与电子元件的耐腐蚀能力。',
    },
    {
      img: './resources.image/IP防护.webp',
      alt: 'IP防护',
      title: 'IP防护',
      desc: '测试防尘防水性能，评估涉水、沙尘等场景下的密封可靠性。',
    },
    {
      img: './resources.image/NVH.jpeg',
      alt: 'NVH',
      title: 'NVH',
      desc: '模拟行驶振动工况，检验结构件与电气连接的疲劳强度与稳定性。',
    },
    {
      img: './resources.image/电池包穿刺.jpeg',
      alt: '电池包穿刺',
      title: '电池包穿刺',
      desc: '针对模拟内部短路，评估电池热失控风险与安全防护能力。',
    },
    {
      img: './resources.image/震动台.jpeg',
      alt: '震动台',
      title: '震动台',
      desc: '模拟各类行驶振动工况，对整车及零部件进行耐久性测试。',
    },
    {
      img: './resources.image/CMF.webp',
      alt: 'CMF',
      title: 'CMF',
      desc: '聚焦色彩、材料与工艺，评估内饰件的外观质感、耐候性及表面耐久性能。',
    },
    {
      img: './resources.image/座舱.png',
      alt: '座舱',
      title: '座舱',
      desc: '模拟真实驾驶环境，测试智能座舱的人机交互、显示系统及功能集成稳定性。',
    },
    {
      img: './resources.image/传感与数据分析.jpg',
      alt: '传感与数据分析',
      title: '传感与数据分析',
      desc: '集成多类型传感器，实时采集实验数据，支持深度分析与可视化呈现。',
    },
  ],
  teaching: [
    {
      img: './resources.image/快速开始.PNG',
      alt: '快速开始',
      title: '快速开始',
      desc: '从零上手实验平台，快速了解流程、操作规范与基础功能。',
    },
    {
      img: './resources.image/机械结构.JPG',
      alt: '机械结构',
      title: '机械结构',
      desc: '围绕底盘、传动与关键部件，系统掌握结构设计与装调逻辑。',
    },
    {
      img: './resources.image/电子与电器.JPG',
      alt: '电子与电器',
      title: '电子与电器',
      desc: '覆盖电源管理、线束连接与电气安全的核心教学内容。',
    },
    {
      img: './resources.image/控制单元.JPG',
      alt: '控制单元',
      title: '控制单元',
      desc: '聚焦控制器架构与策略实现，理解系统级协同控制机制。',
    },
    {
      img: './resources.image/感知单元.JPG',
      alt: '感知单元',
      title: '感知单元',
      desc: '学习多传感器融合与数据处理，提升环境感知与识别能力。',
    },
    {
      img: './resources.image/通信协议.avif',
      alt: '通信协议',
      title: '通信协议',
      desc: '面向车载通信链路，讲解常用协议与数据交互规范。',
    },
    {
      img: './resources.image/代码与API.png',
      alt: '代码与API',
      title: '代码与API',
      desc: '提供接口调用示例与代码实践，支持快速接入二次开发。',
    },
    {
      img: './resources.image/FAQ.JPG',
      alt: 'FAQ',
      title: 'FAQ',
      desc: '汇总高频问题与解决建议，帮助教学与实验过程高效推进。',
    },
  ],
};

let cards = [];
let centerIndex = 1;
let locked = false;

function resolveModeByHash() {
  return window.location.hash === '#teaching-resources' ? 'teaching' : 'scene';
}

function renderCards(mode) {
  const data = resourceData[mode] || resourceData.scene;

  track.innerHTML = data
    .map(
      (item) => `
        <li class="card">
          <img src="${item.img}" alt="${item.alt}" />
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </li>
      `,
    )
    .join('');

  cards = Array.from(track.querySelectorAll('.card'));
  centerIndex = cards.length > 1 ? 1 : 0;
  locked = false;
  renderStatic();
}

function normalize(index) {
  const len = cards.length;
  return ((index % len) + len) % len;
}

function setAllHidden() {
  cards.forEach((card) => {
    card.className = 'card state-hidden';
  });
}

function setState(index, state) {
  if (cards[index]) {
    cards[index].className = `card ${state}`;
  }
}

function prepareFrame(stateMap) {
  cards.forEach((card) => {
    card.style.transition = 'none';
  });

  setAllHidden();
  Object.entries(stateMap).forEach(([index, state]) => {
    setState(Number(index), state);
  });

  void document.body.offsetHeight;

  cards.forEach((card) => {
    card.style.transition = '';
  });
}

function renderStatic() {
  if (cards.length === 0) return;

  const left = normalize(centerIndex - 1);
  const center = centerIndex;
  const right = normalize(centerIndex + 1);

  setAllHidden();
  setState(left, 'state-left');
  setState(center, 'state-center');
  setState(right, 'state-right');
}

function animate(direction) {
  if (locked || cards.length < 3) return;
  locked = true;

  const left = normalize(centerIndex - 1);
  const center = centerIndex;
  const right = normalize(centerIndex + 1);

  if (direction === 'next') {
    const incoming = normalize(centerIndex + 2);

    prepareFrame({
      [left]: 'state-left',
      [center]: 'state-center',
      [right]: 'state-right',
      [incoming]: 'state-off-right',
    });

    requestAnimationFrame(() => {
      setState(left, 'state-off-left');
      setState(center, 'state-left');
      setState(right, 'state-center');
      setState(incoming, 'state-right');
    });

    window.setTimeout(() => {
      centerIndex = right;
      renderStatic();
      locked = false;
    }, TRANSITION_MS + 20);
  } else {
    const incoming = normalize(centerIndex - 2);

    prepareFrame({
      [left]: 'state-left',
      [center]: 'state-center',
      [right]: 'state-right',
      [incoming]: 'state-off-left',
    });

    requestAnimationFrame(() => {
      setState(right, 'state-off-right');
      setState(center, 'state-right');
      setState(left, 'state-center');
      setState(incoming, 'state-left');
    });

    window.setTimeout(() => {
      centerIndex = left;
      renderStatic();
      locked = false;
    }, TRANSITION_MS + 20);
  }
}

function applyModeByHash() {
  renderCards(resolveModeByHash());
}

prevBtn.addEventListener('click', () => animate('prev'));
nextBtn.addEventListener('click', () => animate('next'));
window.addEventListener('hashchange', applyModeByHash);
window.addEventListener('load', applyModeByHash);

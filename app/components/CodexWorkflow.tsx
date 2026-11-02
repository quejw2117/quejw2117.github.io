const steps = [
  { title: "明确任务", text: "把素材、目标、输出格式和检查标准说清楚。" },
  { title: "Codex 辅助执行", text: "辅助整理文件、编写处理脚本，衔接视频与页面更新。" },
  { title: "人工检查", text: "核对画面、声音、信息和发布结果，发现问题后继续修正。" },
  { title: "沉淀为 Skill", text: "将稳定步骤、异常处理与验收清单整理为可复用规则。" },
];

export default function CodexWorkflow() {
  return (
    <article className="codex-workflow" id="codex-workflow" aria-labelledby="codex-workflow-title" tabIndex={-1}>
      <div className="codex-workflow__intro">
        <h3 id="codex-workflow-title"><span>Codex 提效</span>与技能沉淀</h3>
        <p>把重复操作交给工具，把创意判断留给自己。</p>
        <p>将 Codex 融入视频制作与作品维护，辅助完成素材整理、转码、封面提取和页面更新，再把可复用的步骤整理成 Skill 与 SOP。</p>
        <a className="codex-workflow__link" href="#codex-workflow-example">看一个实际应用<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 4v16m-6-6 6 6 6-6" /></svg></a>
      </div>
      <ol className="codex-workflow__steps" aria-label="Codex 工作流的四个环节">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="codex-workflow__step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h4>{step.title}</h4><p>{step.text}</p></div>
          </li>
        ))}
      </ol>
      <div className="codex-workflow__example" id="codex-workflow-example" tabIndex={-1}>
        <div>
          <h4>实际应用：个人作品集更新</h4>
          <p>这份作品集的维护，就是一个应用场景。通过 Codex 协助处理视频转码、封面提取、案例排序、页面调整与发布检查，将重复操作串成完整流程。</p>
          <p className="codex-workflow__outcome">减少重复手工操作，让更多精力回到内容创作与成片质检。</p>
        </div>
        <details className="codex-workflow__skill">
          <summary>查看 Skill 沉淀示例<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5v14" /></svg></summary>
          <dl>
            <div><dt>输入约定</dt><dd>视频文件、案例名称、展示顺序与输出规格。</dd></div>
            <div><dt>执行步骤</dt><dd>整理素材 → 转码与提取封面 → 同步案例内容 → 构建与检查。</dd></div>
            <div><dt>验收清单</dt><dd>视频可播放、比例正确、排序一致、链接可访问。</dd></div>
            <div><dt>复用方式</dt><dd>用 SKILL.md 记录规则，结合脚本与检查清单，让下一次任务有据可循。</dd></div>
          </dl>
        </details>
      </div>
    </article>
  );
}

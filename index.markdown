---
layout: default
title: ホーム
---

<div class="content-layout">
  <div class="main-col">

    <p class="section-title" id="section-title">最新のレビュー</p>

    <div class="tag-filter reveal" id="tag-filter">
      <button class="filter-tag active" data-tag="">すべて</button>
    </div>

<!-- 最新記事フィーチャード（自動） -->
<div class="featured reveal" id="featured-article">
  <div class="featured-bookmark">新着</div>
  <p class="featured-label">今月の一冊</p>
  <h2 class="featured-title" id="featured-title"></h2>
  <p class="featured-author" id="featured-author"></p>
  <p class="featured-body" id="featured-body"></p>
  <div id="featured-points"></div>
  <span class="verdict-tag" id="featured-verdict"></span>
</div>

    <!-- 記事カード一覧 -->
    <div class="books-grid"></div>

    <!-- ページネーション -->
    <div class="pagination reveal"></div>

  </div>

  <!-- サイドバー -->
  <aside>
    <div class="sidebar-widget reveal about-box">
      <div class="about-icon">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
          <rect x="4" y="46" width="52" height="4" rx="1" fill="#5a3d1e"/>
          <rect x="4" y="28" width="52" height="3" rx="1" fill="#5a3d1e"/>
          <rect x="6"  y="32" width="7"  height="14" rx="1" fill="#c0392b"/>
          <rect x="14" y="34" width="5"  height="12" rx="1" fill="#e67e22"/>
          <rect x="20" y="31" width="6"  height="15" rx="1" fill="#f1c40f"/>
          <rect x="27" y="33" width="5"  height="13" rx="1" fill="#27ae60"/>
          <rect x="33" y="30" width="7"  height="16" rx="1" fill="#2980b9"/>
          <rect x="41" y="34" width="5"  height="12" rx="1" fill="#8e44ad"/>
          <rect x="47" y="32" width="7"  height="14" rx="1" fill="#16a085"/>
          <rect x="6"  y="10" width="6"  height="18" rx="1" fill="#e74c3c"/>
          <rect x="13" y="13" width="5"  height="15" rx="1" fill="#d35400"/>
          <rect x="19" y="9"  width="7"  height="19" rx="1" fill="#f39c12"/>
          <rect x="27" y="12" width="5"  height="16" rx="1" fill="#1abc9c"/>
          <rect x="33" y="10" width="6"  height="18" rx="1" fill="#3498db"/>
          <rect x="40" y="13" width="5"  height="15" rx="1" fill="#9b59b6"/>
          <rect x="46" y="11" width="8"  height="17" rx="1" fill="#e91e8c"/>
          <rect x="4"  y="6" width="3" height="44" rx="1" fill="#5a3d1e"/>
          <rect x="53" y="6" width="3" height="44" rx="1" fill="#5a3d1e"/>
        </svg>
      </div>
      <p class="about-name">森の隠し図書館</p>
      <p class="about-text">面白そうで買った本を、さらっと正直に紹介するブログです。長い要約より「買う価値あるか」を30秒で。</p>
    </div>

    <div class="sidebar-widget reveal">
      <p class="widget-title">最近読んだ本</p>
      <ul class="widget-list">
        <li>逆転交渉術<span>心理・行動</span></li>
        <li>体力おばけへの道<span>健康・運動</span></li>
      </ul>
    </div>

    <div class="sidebar-widget reveal">
      <p class="widget-title">タグ</p>
      <div class="tag-cloud" id="sidebar-tags"></div>
    </div>
  </aside>
</div>
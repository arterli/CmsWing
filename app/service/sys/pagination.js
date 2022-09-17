'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class paginationService extends Service {

  /**
   * get page url
   * @param  {Object} options []
   * @param  {Object} http    []
   * @param ctx
   * @return {String}         []
   */
  getPageUrl(options) {
    const { ctx } = this;
    let pageUrl = options.url;
    if (!pageUrl) {
      let prefix = (options.prefix || '') + '?';
      const querys = [];
      for (const name in ctx.query) {
        if (name === 'page') {
          continue;
        }
        querys.push(ctx.helper.escapeHtml(name) + '=' + ctx.helper.escapeHtml(ctx.query[name]));
      }
      prefix += querys.join('&');
      if (querys.length) {
        prefix += '&';
      }
      pageUrl = prefix + 'page=__PAGE__';
    }
    return pageUrl;
  }

  /**
   * get page index
   * @param  {Object} pagerData []
   * @param  {Object} options   []
   * @return {Array}           []
   */
  getPageIndex(pagerData, options) {
    const num = options.pageNum || 2;
    const page = pagerData.currentPage || 1;
    const totalPages = pagerData.totalPages;
    const pageIndex = [];
    let start = page - num;
    let stop = page + num;

    if (start <= 1) {
      start = 1;
      stop = start + num * 2 + 1;
    }

    if (stop >= totalPages) {
      stop = totalPages;
      start = totalPages - num * 2 - 1;
    }

    for (let i = start; i <= stop; i++) {
      if (i >= 1 && i <= totalPages) {
        pageIndex.push(i);
      }
    }
    return pageIndex;
  }

  /**
   * thinkjs pagenation
   * @param  {Object} pagerData [pagerData by countSelect]
   * @param  {Object} ctx      []
   * @param  {Object} options   []
   * @return {String}           []
   */
  pagination(pagerData, options) {
    const { ctx } = this;
    options = Object.assign({
      desc: false, // show desc
      pageNum: 2,
      url: '',
      class: '',
      limit: 10,
      text: {
        next: '下一页',
        prev: '上一页',
        total: 'count: __COUNT__ , pages: __PAGE__',
      },
    }, options);
    pagerData.currentPage = Number(ctx.query.page) || 1;
    pagerData.totalPages = Math.ceil(pagerData.count / options.limit);
    // console.log(pagerData);
    if (pagerData.totalPages <= 1) return '';
    const pageUrl = this.getPageUrl(options);
    // console.log(pageUrl);
    // return true;
    const currentPage = pagerData.currentPage || 1;

    let html = '<ul class="pagination pagination-pill justify-content-end justify-content-center justify-content-md-end">';
    if (options.class) {
      html = `<ul class="pagination ${options.class}">`;
    }
    if (options.desc) {
      const total = options.text.total.replace('__COUNT__', pagerData.count).replace('__PAGE__', pagerData.totalPages);
      html += `<li class="disabled"><span>${total}</span></li>`;
    }
    let disabled = 'disabled';
    if (currentPage > 1) {
      disabled = '';
    }
    html += `<li class="page-item ${disabled}"><a class="page-link" href="${pageUrl.replace('__PAGE__', currentPage - 1)}" tabindex="-1">${options.text.prev}</a></li>`;
    const pageIndex = this.getPageIndex(pagerData, options);
    if (pageIndex[0] > 1) {

      html += `<li class="page-item"><a class="page-link" href="${pageUrl.replace('__PAGE__', 1)}">1</a></li>`;
    }
    if (pageIndex[0] > 2) {
      html += '<li class="page-item disabled"><a class="nav-link" href="#" tabindex="-1">...</a></li>';
    }

    for (let i = 0, length = pageIndex.length; i < length; i++) {
      const p = pageIndex[i];
      if (p === currentPage) {
        html += `<li class="page-item active" aria-current="page"><a class="page-link" href="${pageUrl.replace('__PAGE__', p)}">${p}<span class="visually-hidden">(current)</span></a></li>`;
      } else {
        html += `<li class="page-item"><a class="page-link" href="${pageUrl.replace('__PAGE__', p)}">${p}</a></li>`;
      }
    }
    if (pageIndex.length > 1) {
      const last = pageIndex[pageIndex.length - 1];
      if (last < (pagerData.totalPages - 1)) {
        html += '<li class="page-item disabled"><a class="nav-link" href="#" tabindex="-1">...</a></li>';
      }
      if (last < pagerData.totalPages) {
        html += `<li class="page-item"><a class="page-link" href="${pageUrl.replace('__PAGE__', pagerData.totalPages)}">${pagerData.totalPages}</a></li>`;
      }
    }
    let disabled1 = 'disabled';
    if (currentPage < pagerData.totalPages) {
      disabled1 = '';
    }
    html += `<li class="page-item ${disabled1}"><a class="page-link" href="${pageUrl.replace('__PAGE__', currentPage + 1)}">${options.text.next}</a></li>`;
    html += '</ul>';
    return html;
  }


}
module.exports = paginationService;

<template lang='pug'>
    section(class='list-item' @click='onDetail')
        //- header: 作者&Blog 信息区。作者头像，作者名字，发布日期，分类，tags
        div(class='item-header')
            div(class='item-tags')
                i(class='fa fa-tags')
                span(class='chip item-tag' v-for='tag in item.tags')= '{{tag}}'
            span(class='header-more')
                i(class='fa fa-ellipsis-v')

        //- content: blog 内容概览。图片，文字概览
        div(class='item-content') 
            img(v-show='item.cover && item.cover.length > 0' class='item-content-cover' v-bind:src='item.cover && item.cover[0]')
            section(class='item-content-overview')
                h1= '{{item.title}}'
                div(v-html='item.content')
                span= 'more ...'
        
        //- footer: 互动功能区。点赞，收藏，转发
        div(class='item-footer')
            span(class='like' @click='onLike()')
                i(class='fa fa-thumbs-o-up')
                span(class='likeCount')= '{{likeCount>0? likeCount: ""}}'
            span(class='bookmark')
                i(:class="[item.isBookmarked? 'fa fa-bookmark': 'fa fa-bookmark-o']")
            
            span(class='grey-text text-lighten update-at')= '发布于 {{updateAt}}'                        
            i(class='more fa fa-angle-down')
</template>

<script>
'use strict';

import marked from 'marked';
import DateFormat from 'dateformat';
import {Store, Types} from '../store';
import Router from '../router';

/**
 * data model 
 * item: 
 * {
 *  title: string,
 *  content: string
 *  tags: string array,
 *  author: author object,
 *  like: number. number of how many people like this post,
 *  updateAt: date,
 *  cover: array. array of image urls,
 *  isLike: bool,
 *  isBookmarked: bool
 * }
 * 
 * author: 
 * {
 *  name: string,
 *  avatar: url,
 *  tech: array. ['android', 'linux'], etc
 * }
 * 
 **/
 
const ListItem = {
    props: ['item'],
    data() {
        return {
            likeCount: 0
        }
    },
    methods: {
        onLike() {
            event.stopPropagation();
            const isLike = this.isLike;
            const that = this;
            
            Store.dispatch({
                    type: Types.Post.LIKE,
                    isLike
                }).then((response) => {
                    console.log('onLike response: ' + isLike);
                    that.$data.isLike = !that.isLike;
                    that.likeCount = that.likeCount + 1;
                }, (error) => {
                    console.log('onLike error');
                });
        },

        onDetail(event) {
            event.stopPropagation();

            Router.push({
                    name: 'post',
                    params: {
                        id: this.item._id
                    }
            });
        }
    },

    components: {
        
    },

    computed: {
        updateAt() {
            return  DateFormat(this.item.updatedAt, 'yyyy-mm-dd HH:MM');
        },
        isLike() {
            return this.item.isLike;
        }
    }
};

export default ListItem;

</script>

<style lang='sass'>
    .list-item {
        position: relative;
        padding: 0.5em;
        box-shadow: 0px 2px 4px 2px rgba(0,0,0,0.14);
        margin-bottom: 2em;
        min-height: 24em;

        .item-header {
            position: relative;
            padding: .25em 0;
            min-height: 2em;

           .item-tags {
                display: inline-block;

                i:nth-child(1) {
                    padding-right: .25em;
                }

                span {
                    padding-right: 1em;
                }

                .chip {
                    font-weight: 200;
                    background-color: rgba(250, 250, 250, 0.61);
                }
           }

           .header-more {
                position: absolute;
                right: 0;
                top: 0;
                padding: 0.5em 1em 1em 1em;
           }
        }

        .item-content {
            position: relative;
            padding-bottom: 2em;

            .item-content-cover {
                width: 100%;
            }

            .item-content-overview {
                h1, h2 {
                    font-size: 2.25em;
                }

                h3, h4 {
                    font-size: 1.5em;
                }

                p {

                }

                span {

                }
            }
        }

        .item-footer {
            position: absolute;
            bottom: 0.5em;
            left: 1em;
            right: 1em;

            .like {
                .likeCount {
                    padding: 0 .5em;
                }
            }

            .bookmark {
                position: absolute;
                left: 0;
                margin-left: 4em;
            }

            .more {
                position: absolute;
                right: 0;
            }

            .update-at {
                font-size: .75em;
                position: absolute;
                right: 2em;
            }
        }
    }
</style>
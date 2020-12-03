import React, { Component } from 'react';
import { connect } from 'react-redux';
//FIXME: Infinite scroll to be implemented
// import InfiniteScroll from 'react-infinite-scroller';
import { List, Divider, Space, Button, Comment } from 'antd';
//FIXME: Infinite scroll to be implemented
// import { Spin, message } from 'antd';
import { MessageTwoTone, HeartTwoTone } from '@ant-design/icons';
import * as actionCreators from '../../store/actions/index';
import styled, { keyframes } from 'styled-components';
import Author from '../../components/Author/Author'

/* Components */
import GameTag from '../../components/GameTag/GameTag'
// import CommentList from './CommentList';

const PostPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* overflow: auto; */
    /* padding: 8px 24px; */
    height: 100%;
    
`;

const GameTagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const LoadingWrapper = styled.div`
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
`;

const PostListWrapper = styled.div`
/*Responsive Styles*/
/* Smartphones (portrait) ---------------- */
@media only screen 
and (max-width : 320px)
{
/* Add Your CSS Styling Here */
}

/* Smartphones (landscape) ---------------- */
@media only screen 
and (min-width : 321px)
and (max-width : 767px)
{
/* Add Your CSS Styling Here */
}

/* Tablets (portrait) -------------------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait)
{
/* Add Your CSS Styling Here */
}

/* Tablets (landscape) ------------------- */
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)
{   
/* Add Your CSS Styling Here */
    width: 90%;
    align-self: center;
}
/* Old Desktops and laptops ------------------ */

@media only screen 
and (min-width : 1025px) 
{
/* Add Your CSS Styling Here */
    width: 80%;
    align-self: center;
}

/* Desktops ------------------ */
@media only screen 
and (min-width : 1201px) 
{
/* Add Your CSS Styling Here */
    width: 70%;
    align-self: center;
}
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    box-shadow: 3px 3px 5px 2px rgba(0,0,0,0.2);
    padding: 10px;
    border-radius: 15px;
    /* flex-wrap: wrap; */
    /* justify-content: space-between; */
    /* border: 1px solid #005691; */
`;

const PostHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const AuthorItem = styled.div`
    flex: none; // flex-grow/shrink/basis : 0/0/auto
`;

const ButtonItem = styled.div`
    flex: none;
    ${(props) => props.active && `
    animation: ${buttonShake} .8s ;
    `}
`;

// FIXME: 애니메이션 작동 안됨.
const buttonShake = keyframes`
    0%{
        transform: translate(0);
    }
    20%,
    40%,
    60%,
    80%{
        transform: translate(.8em);
        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.5);
    }
    10%,
    30%,
    50%{
        transform: translate(-.2em);
    }
    70%,
    100%{
        transform: translate(0);
    }
`;

const GameTagItem = styled.div`
    margin-left: auto;
    margin-right: 0px;
`;

const PostBodyContainer = styled.div`
    // empty container for handle click body
`;

const WidePostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    /* flex-wrap: wrap; */
    cursor: pointer;
`;

const WideContentsContainer = styled.div`
    /* flex-grow:2; */
    flex-wrap: wrap;
    flex-basis: 100%;
    word-break: break-all;
    word-wrap: normal;
    margin-top: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    /* word-wrap: "true"; */
    /* display: inline-flex; */
    /* flex-basis: 70%; */
`;
const WideImageContainer = styled.div`
    /* flex-grow:1; */
    flex-basis:1000%;
    min-height: 1px;
    margin-left: 20px;
    margin-right: 20px;
    /* flex: auto; */
    /* width: 30%; */
`;

const NarrowPostWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    flex-shrink: 1;
    /* flex-wrap: wrap; */
    cursor: pointer;
`;

const NarrowContentsContainer = styled.div`
    /* flex-grow:2; */
    flex-wrap: wrap;
    flex-basis: 70%;
    word-break: break-all;
    word-wrap: normal;
    /* word-wrap: "true"; */
    /* display: inline-flex; */
    /* flex-basis: 70%; */
`;

const NarrowImageContainer = styled.div`
    /* flex-grow:1; */
    flex-basis:30%;
    min-height: 1px;
    margin-left: 20px;
    /* flex: auto; */
    /* width: 30%; */
`;

const PostFooterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 5px;
`;

const CommentWrapper = styled.div``;
const CommentFormContainer = styled.div``;
const CommentListContainer = styled.div``;

class Post extends Component {

    state = {
        selectedTagList: [],
        activePostList: [], // under selected tag
        clickedPostId: null,

        commenttingPostId: null,
        likingPostId: null,
        commentList: [],
        //FIXME: Infinite scroll to be implemented
        // loading: false,
        // hasMore: true,
    }

    componentDidMount() {
        this.props.onGetCurrentUser();
        this.props.onGetPostList();
        this.props.onGetTagList();
        // this.props.onGetCommentList();
        if (this.props.storedCurrentUser) {
            this.setState({
                selectedTagList: this.props.storedCurrentUser.tagList,
                activePostList: this.props.storedPostList
            });
            //FIXME: Infinite scroll to be implemented
            // }
            // this.fetchData(res => {
            //     this.setState({
            //         postList: res.results,
            //     });
            // });
        }
    }

    onToggleTag = (tag_id) => {
        const checked = this.state.selectedTagList.indexOf(tag_id) > -1;
        const { selectedTagList } = this.state;
        const nextSelectedTags = checked ?
            (selectedTagList.filter(id => id !== tag_id)) :
            ([...selectedTagList, tag_id]);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTagList: nextSelectedTags });
    }

    handleAuthorClicked = () => {
        console.log("Author click!");
    }

    handleShallWeClicked = () => {
        console.log("ShallWe click!");
    }

    handleBodyClicked = (postId) => {
        if (this.state.clickedPostId === null) {
            this.setState({
                clickedPostId: postId
            })
        } else if (this.state.clickedPostId === postId){
            this.setState({
                clickedPostId: null
            })
        } else {
            this.setState({
                clickedPostId: postId
            })
        }
    }

    handleLikeCliked = () => {
        console.log("Like!");
    }

    handleCommentClicked = (postId) => {
        if (this.state.commenttingPostId === null) {
            this.setState({
                commenttingPostId: postId,
                // commentList: this.props.onGetPost(postId)
                // commentList: this.props.onGetCommentList(postId)
                // commentList: this.props.storedCommentList
            })
            this.props.onGetCommentList(postId);
            console.log("commenttingPostId state updated: ", this.state.commenttingPostId);
            console.log("commentList state updated: ", this.state.commentList);
        } else if (this.state.commenttingPostId === postId){
            this.setState({
                commenttingPostId: null,
                // commentList: []
            })
            console.log("commenttingPostId state updated: ", this.state.commenttingPostId);
            console.log("commentList state updated: ", this.state.commentList);
        } else {
            this.setState({
                commenttingPostId: postId,
                // commentList: this.props.onGetCommentList(postId)
                // commentList: this.props.onGetPost(postId)
                // commentList: this.props.storedCommentList
            })
            console.log("commenttingPostId state updated: ", this.state.commenttingPostId);
            console.log("commentList state updated: ", this.state.commentList);
        }
    }

    //FIXME: backend에서 코멘트 수정된 뒤 추가.
    // const showCommentList = () => {
    //     if (showComment) {
    //         return (
    //             <CommentList />
    //         )
    //     } else {
    //         return ({});
    //     }
    // }


    //FIXME: Infinite scroll to be implemented
    // handleInfiniteOnLoad = () => {
    //     let { activePostList } = this.state;
    //     this.setState({
    //         loading: true,
    //     });

    //     if (activePostList.length > 3) { // 길이 관련 손봐야함.
    //         message.warning('모든 포스트를 다 읽었습니다.');
    //         this.setState({
    //             hasMore: false,
    //             loading: false,
    //         });
    //         return;
    //     }

    //FIXME: Infinite scroll to be implemented
    //     this.fetchData(posts => {
    //         activePostList = activePostList.concat(posts);
    //         this.setState({
    //             activePostList,
    //             loading: false,
    //         });
    //     });
    // };

    //FIXME: Infinite scroll to be implemented
    // fetchData = callback => {
    //     reqwest({
    //         url: 'http://localhost:3000/api/post',
    //         type: 'json',
    //         method: 'get',
    //         contentType: 'application/json',
    //         success: res => {
    //             // console.log(res)
    //             callback(res);
    //         },
    //     });
    // };

    returnBodyFormat = (post, isWideFormat) => {
        if (isWideFormat) {
            // console.log("Wide post")
            return (
                <WidePostWrapper>
                    <WideImageContainer>
                        <img src={post.image} style={{ width: "100%" }} />
                    </WideImageContainer>
                    <WideContentsContainer style={{ width: "100%" }}>
                        {post.content}
                    </WideContentsContainer>
                </WidePostWrapper>
            );
        } else {
            // console.log("Narow post")
            return (
                <NarrowPostWrapper>
                    <NarrowContentsContainer style={{ width: "100%" }}>
                        {post.content}
                    </NarrowContentsContainer>
                    <NarrowImageContainer>
                        <img src={post.image} style={{ width: "100%" }} />
                    </NarrowImageContainer>
                </NarrowPostWrapper>
            );
        }
    }

    returnCommentView = (post, isToggleComment, commentList) => {
        if (isToggleComment) {
            console.log("Toggle!");
            console.log(commentList);
            // Show Form, commentList
            return (
                <>
                    <CommentWrapper>
                        <CommentFormContainer>
                        </CommentFormContainer>
                        <CommentListContainer style={{ width: "100%" }}>
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={commentList}
                                renderItem={item => (
                                    <li>
                                        <Comment
                                            author={item.authorName}
                                            content={item.content}
                                        />
                                    </li>
                                )}
                            />
                        </CommentListContainer>
                    </CommentWrapper>
                </>
            );
        } else {
            // Show nothing
            console.log("Show nothing");
            return (
                <div></div>
            );
        }
    }

    render() {
        let tagList = [];
        let tagToggle = [];
        //FIXME: Infinite scroll to be implemented
        // let postList = []
        let activePostList = [];
        let user = null;
        let clickedPostId = null;
        let commenttingPostId = null;
        let commentList = [];
        
        if (this.props.storedCurrentUser && this.props.storedPostList && this.props.storedTagList) {
            user = this.props.storedCurrentUser;
            tagList = this.props.storedTagList;
            tagToggle = this.props.storedCurrentUser.tagList.map(tag_id => {
                return (
                    <GameTag 
                        key={tag_id}
                        tagId={tag_id} 
                        isChecked={this.state.selectedTagList.includes(tag_id)}
                        onClick={() => this.onToggleTag(tag_id)}
                    />
                );
            });
            //FIXME: Infinite scroll to be implemented
            // postList = this.props.storedPostList;
            activePostList = this.props.storedPostList.filter(post => {
                return this.state.selectedTagList.includes(post.tag);
            });
        }

        // Zoom in/out the clicked post's view
        if (this.state.clickedPostId !== null) {
            clickedPostId = this.state.clickedPostId;
        }

        // Toggle comment view
        if (this.state.commenttingPostId !== null) {
            commenttingPostId = this.state.commenttingPostId;
            commentList = this.props.storedCommentList;
            // commentList = this.props.onGetCommentList(commenttingPostId);
            // commentList = this.state.commentList;
        }

        return (
            <PostPageWrapper>
                <GameTagWrapper>
                    <span style={{ marginRight: 8 }}>Your Games:</span>
                    {tagToggle}
                </GameTagWrapper> 

                <PostListWrapper>
                {/*
                //FIXME: Infinite scroll to be implemented
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                */}
                    <List
                        dataSource={activePostList}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <PostContainer>
                                    <PostHeaderContainer>
                                        <AuthorItem onClick={() => this.handleAuthorClicked()} style={{ cursor: "pointer" }} >
                                            <Author
                                                //FIXME: user로 넘기도록 수정해야함
                                                name={item.authorName}
                                                avatar={item.authorAvatar}
                                                showOnline={true}
                                            />
                                        </AuthorItem>
                                        <ButtonItem>
                                            <Button
                                                type="primary"
                                                shape="round"
                                                onClick={() => this.handleShallWeClicked()}
                                                // disabled="true"
                                                style={{ fontSize: 12, fontWeight: "bolder" }}
                                            >
                                                Shall We ?
                                            </Button>
                                        </ButtonItem>
                                        <GameTagItem>
                                            <GameTag
                                                key={item.tag}
                                                tagId={item.tag}
                                                isChecked={true}
                                            />
                                        </GameTagItem>
                                    </PostHeaderContainer>

                                    <Divider style={{ marginTop: 0, marginBottom: 10 }} />

                                    <PostBodyContainer onClick={() => this.handleBodyClicked(item.id)}>
                                        {this.returnBodyFormat(item, item.id===clickedPostId)}
                                    </PostBodyContainer>

                                    <Divider style={{ marginTop: 0, marginBottom: 10 }} />

                                    <PostFooterContainer>
                                        <IconContainer>
                                            <div>
                                                <Space>
                                                    <HeartTwoTone
                                                        onClick={() => this.handleLikeCliked()}
                                                    />
                                                    {item.likeNum}
                                                </Space>
                                            </div>
                                            <Divider
                                                type="vertical"
                                                style={{ alignSelf: "center", marginLeft: "10px", marginRight: "10px" }}
                                            />
                                            <div>
                                                <Space>
                                                    <MessageTwoTone
                                                        onClick={() => this.handleCommentClicked(item.id)}
                                                    />
                                                    ??
                                                </Space>
                                            </div>
                                        </IconContainer>
                                        {this.returnCommentView(item, item.id === commenttingPostId, commentList)}
                                    </PostFooterContainer>
                                </PostContainer>
                            </List.Item>
                        )}
                    >
                        {/* {this.state.loading && this.state.hasMore && (
                            <LoadingWrapper>
                                <Spin />
                            </LoadingWrapper>
                        )} */}
                    </List>
                {/* </InfiniteScroll> */}
                </PostListWrapper>
            </PostPageWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        storedCurrentUser: state.ur.currentUser,
        storedTagList: state.tg.tagList,
        storedPostList: state.ps.postList,
        storedCommentList: state.ps.commentList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCurrentUser: () => 
            dispatch(actionCreators.getCurrentUser()),
        onPutUser: (user) => 
            dispatch(actionCreators.putUser(user)),
        onGetPostList: () => 
            dispatch(actionCreators.getPostList()),
        onGetTagList: () => 
            dispatch(actionCreators.getTagList()),
        onGetCommentList: (id) =>
            dispatch(actionCreators.getCommentList(id)),
        onGetPost: (id) => 
            dispatch(actionCreators.getPost(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
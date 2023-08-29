import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CustomButton from '../../../components/CustomButton'
import Alert from '../../../components/elements/Alert'
import { selectUserId } from '../../auth/authSlice'
import CommentCard from './CommentCard'
import styles from './styles/comment-section.module.css'
import { useAddCommentMutation } from './tasksApiSlice'

const CommentSection = ({ task }) => {
  const cx = classNames.bind(styles)
  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const [commentBody, setCommentBody] = useState('')
  const userId = useSelector(selectUserId)
  const { jobId } = useParams()
  const commentRef = useRef(null)

  const [addComment, { isError: isCommentError, error: commentError }] =
    useAddCommentMutation()

  useEffect(() => {
    if (commentBoxOpen) {
      commentRef.current.focus()
    }
  }, [commentBoxOpen])

  const onAddCommentClicked = () => {
    setCommentBoxOpen(true)
  }
  const cancelComment = () => {
    setCommentBody('')
    setCommentBoxOpen(false)
  }

  const onSaveCommentClicked = async () => {
    await addComment({ jobId, taskId: task._id, commentBody, author: userId })
    setCommentBody('')
    setCommentBoxOpen(false)
  }

  return (
    <div className={cx('wrapper')}>
      {isCommentError ? (
        <Alert alertOpen={true} variant={'error'}>
          {' '}
          {commentError?.data?.message}{' '}
        </Alert>
      ) : null}
      {task?.comments?.map((comment) => (
        <CommentCard key={comment._id} comment={comment} taskId={task._id} />
      ))}

      {commentBoxOpen ? (
        <>
          <textarea
            className={cx('comment-body')}
            placeholder='Add a comment...'
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            ref={commentRef}
          />
          <div className={cx('button-group')}>
            <CustomButton variant='accent' onClick={onSaveCommentClicked}>
              Save
            </CustomButton>
            <CustomButton variant='secondary' onClick={cancelComment}>
              Cancel
            </CustomButton>
          </div>
        </>
      ) : null}
      {!commentBoxOpen ? (
        <CustomButton variant='accent' onClick={onAddCommentClicked}>
          Add Comment
        </CustomButton>
      ) : null}
    </div>
  )
}
export default CommentSection

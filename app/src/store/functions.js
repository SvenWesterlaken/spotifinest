import moment from 'moment'
import * as _ from 'lodash'

export function checkCache (items, requestAt) {
  return moment().isSameOrAfter(+requestAt) || _.isEmpty(items) ? null : items
}

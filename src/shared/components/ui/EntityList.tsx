import Card from "./Card"
import CardHeader from "./CardHeader"
import EntityItem from "./EntityItem"
import type { EntityItemProps } from "./EntityItem"

interface EntityListProps {
  title: string
  items: EntityItemProps[]
  action?: {
    label: string
    href?: string
  }
  className?: string
}

export default function EntityList({ title, items, action, className }: EntityListProps) {
  return (
    <Card className={className}>
      <CardHeader title={title} action={action} />
      <div className="space-y-8">
        {items.map((item, index) => (
          <EntityItem key={`entity-${item.title}-${index}`} item={item} />
        ))}
      </div>
    </Card>
  )
} 
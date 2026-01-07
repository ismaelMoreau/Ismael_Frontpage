# AwooSurvivor - Code Review Checklist

A code cleanliness review for solo dev cleanup. No backwards compatibility needed - just delete unused code - no fallback. backward compatibility isnt prototype wise, Fail loud is.

---

## Dead Code Detection

Delete immediately if found:

- [ ] Unused private methods
- [ ] Unused private fields or variables
- [ ] Unused parameters in methods
- [ ] Unreachable code after return/break/continue
- [ ] Commented-out code blocks
- [ ] Empty methods or stubs
- [ ] Unused using/import statements
- [ ] Unused local variables
- [ ] Methods that are never called
- [ ] Events that are never subscribed to

---

## Duplicate Code Detection

- [ ] No copy-pasted logic blocks (extract to shared method)
- [ ] No repeated calculations (cache results)
- [ ] No duplicate component definitions
- [ ] No duplicate system logic across systems
- [ ] No repeated magic numbers (use constants)
- [ ] No similar methods that could be unified

---

## Obsolete Code Detection

**Delete immediately** - no "deprecation period" for solo dev:

**Solo dev rule**: If code is replaced, delete the old version immediately. There's no one else to coordinate with.

---

## Unnecessary Fallback Detection

- [ ] No try-catch blocks hiding real errors
- [ ] No null checks for values that can never be null
- [ ] No default values that are never used
- [ ] No fallback paths that can never execute
- [ ] No redundant validation for already-validated data

---

## Over-Engineering Detection

- [ ] No abstractions with single implementation
- [ ] No interfaces implemented by only one class
- [ ] No factory patterns for simple object creation
- [ ] No unnecessary generics
- [ ] No premature optimization code
- [ ] No feature flags for features that are always on/off
- [ ] No configuration for values that never change

---

## Leftover Artifacts

- [ ] No TODO comments for completed work
- [ ] No FIXME comments for fixed issues
- [ ] No debug logging left in hot paths
- [ ] No test data or placeholder values
- [ ] No temporary variable names (temp, tmp, foo, bar)
- [ ] No renamed unused variables with underscore prefix (_oldVar)

---

## Consistency Check

- [ ] Naming conventions consistent
- [ ] File organization matches project structure
- [ ] Similar components follow same pattern
- [ ] Similar systems follow same pattern

---

## ECS Architecture Validation

### Components
- [ ] Components contain ONLY data (fields), no methods
- [ ] No Unity object references (GameObject, Transform)
- [ ] Blittable types only
- [ ] Tag components are empty structs

### Systems
- [ ] All game logic in systems, not components
- [ ] No public fields storing runtime state
- [ ] Systems grouped in correct SystemGroup
- [ ] `[BurstCompile]` where possible

### Bakers
- [ ] Bakers only run at conversion time
- [ ] `DependsOn()` called for all SOs
- [ ] GetEntity uses correct TransformUsageFlags

---

## Clean Removal Check

When replacing features - **delete old code immediately**:

- [ ] Old components fully deleted (not deprecated)
- [ ] Old systems fully deleted
- [ ] Old prefabs removed
- [ ] References to removed code cleaned from other files
- [ ] **No backward-compatibility shims** - you're the only dev
- [ ] **No deprecation warnings** - just delete

---

## Solo Dev Principles

1. **Delete, don't deprecate** - There's no API consumers to warn
2. **No migration periods** - Migrate everything in one pass
3. **No feature flags** - Either ship it or delete it
4. **No abstraction layers** - Write concrete code until you need abstraction
5. **Clean as you go** - Don't leave cleanup for "later"
